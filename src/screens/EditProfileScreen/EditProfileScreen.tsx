import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserByUsernameQuery,
  UserByUsernameQueryVariables,
} from "../../API";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { deleteUser, getUser, updateUser, userByUsername } from "./queries";
import { useAuthContext } from "../../contexts/AuthContext";
import ApiErrorMessage from "../../components/ApiErrorMessage/ApiErrorMessage";
import { DEFAULT_USER_IMAGE } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import CustomInput, { IEditableUser } from "./CustomInput";

//*FORM
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

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

  const [getUserByUsername] = useLazyQuery<
    UserByUsernameQuery,
    UserByUsernameQueryVariables
  >(userByUsername);

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
    if (navigation.canGoBack()) navigation.goBack();
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

  const validateUsername = async (username: string) => {
    //* Check if username is already taken
    try {
      const response = await getUserByUsername({ variables: { username } });
      if (response.error) Alert.alert("Failed to fetch user");
      const user = response.data?.userByUsername?.items;
      if (user && user.length > 0 && user?.[0]?.id !== userId)
        return "Username is already taken";
    } catch (error) {
      Alert.alert("Failed to fetch user");
    }
    return true;
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
          validate: validateUsername,
        }}
      />
      <CustomInput
        control={control}
        name="website"
        label="Website"
        rules={{
          required: "Website is required",
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

export default EditProfileScreen;
