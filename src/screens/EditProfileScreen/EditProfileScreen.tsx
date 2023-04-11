import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { useForm, Controller, Control } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import user from "../../assets/data/user.json";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { IUser } from "../../types/models";

//*FORM
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

type IEditableUserFields = "name" | "username" | "website" | "bio";
type IEditableUser = Pick<IUser, IEditableUserFields>;

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
              value={value}
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user.website,
      bio: user.bio,
    },
  });

  const onSubmit = (data: IEditableUser) => {
    console.warn("Submit", data);
  };

  //*IMAGE PICKER
  const [image, setImage] = useState(user.image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.page}>
      <Image source={{ uri: image }} style={styles.avatar} />
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
        Submit
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
