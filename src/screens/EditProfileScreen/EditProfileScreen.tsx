import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller, Control } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from "../../API";
import { useQuery, useMutation } from "@apollo/client";
import { deleteUser, getUser, updateUser } from "./queries";
import { useAuthContext } from "../../contexts/AuthContext";
import ApiErrorMessage from "../../components/ApiErrorMessage/ApiErrorMessage";
import { DEFAULT_USER_IMAGE } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

//*FORM
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

type IEditableUserFields = "name" | "username" | "website" | "bio";
type IEditableUser = Pick<User, IEditableUserFields>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserFields;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({
  control,
  label,
  name,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              value={value || ""}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[
                styles.input,
                { borderColor: error ? colors.error : colors.border },
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{ color: colors.error }}>
                {error.message || "Error"}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

const EditProfileScreen = () => {
  const { control, handleSubmit, setValue } = useForm<IEditableUser>();
  const navigation = useNavigation();
  const { userId, user: authUser } = useAuthContext();
  //*QUERY
  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, { variables: { id: userId } });
  const user = data?.getUser;
  const [image, setImage] = useState(user?.image);

  const [doUpdateUser, { loading: updateLoading, error: updateError }] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const [doDelete, { loading: deleteLoading, error: deleteError }] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("username", user.username);
      setValue("website", user.website);
      setValue("bio", user.bio);
    }
  }, [user, setValue]);

  const onSubmit = async (formData: IEditableUser) => {
    await doUpdateUser({
      variables: {
        input: { id: userId, ...formData, _version: user?._version },
      },
    });
    navigation.goBack();
  };

  const confirmDelete = async () => {
    Alert.alert("Delete Account", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => startDeleting(),
      },
    ]);
  };

  const startDeleting = async () => {
    if (!userId) return;
    //? Delete user from database
    await doDelete({
      variables: { input: { id: userId, _version: user?._version } },
    });
    //? Delete user from cognito
    authUser?.deleteUser((err) => {
      if (err) console.log(err);
      Auth.signOut();
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  if (loading) return <ActivityIndicator />;
  if (error || updateError || deleteError || !data)
    return (
      <ApiErrorMessage
        title="Error fetching or updating user"
        message={error?.message || updateError?.message || deleteError?.message}
      />
    );

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: image || DEFAULT_USER_IMAGE }}
        style={styles.avatar}
      />
      <Text style={styles.textButton} onPress={pickImage}>
        EditProfileScreen
      </Text>

      <CustomInput
        control={control}
        name="name"
        label="Name"
        rules={{ required: "Name is required" }}
      />
      <CustomInput
        control={control}
        name="username"
        label="Username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username should be more than 3 characters",
          },
        }}
      />
      <CustomInput
        control={control}
        name="website"
        label="Website"
        rules={{
          // required: "Website is required",
          pattern: {
            value: URL_REGEX,
            message: "Website should be a valid URL",
          },
        }}
      />
      <CustomInput
        control={control}
        name="bio"
        label="Bio"
        multiline
        rules={{
          maxLength: {
            value: 200,
            message: "Bio should be less than 200 characters",
          },
        }}
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        {updateLoading ? "Loading..." : "Save"}
      </Text>

      <Text onPress={confirmDelete} style={styles.textButtonDanger}>
        {deleteLoading ? "Deleting..." : "DELETE USER"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { alignItems: "center", padding: 10 },
  avatar: { width: "30%", aspectRatio: 1, borderRadius: 100 },
  textButton: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  textButtonDanger: {
    color: colors.error,
    fontSize: 20,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginVertical: 10,
  },
  label: {
    width: 75,
  },
  input: {
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
});

export default EditProfileScreen;
