import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import user from "../../assets/data/user.json";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

interface ICustomInput {
  label: string;
  placeholder: string;
  multiline?: boolean;
}

const CustomInput = ({ label, placeholder, multiline }: ICustomInput) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      multiline={multiline}
    />
  </View>
);

const EditProfileScreen = () => {
  const onSubmit = () => {
    console.warn("Submit");
  };
  return (
    <View style={styles.page}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <Text style={styles.textButton}>EditProfileScreen</Text>

      <CustomInput label="Name" placeholder={user.name} />
      <CustomInput label="Username" placeholder={user.username} />
      <CustomInput label="Website" placeholder="Website" />
      <CustomInput label="Bio" placeholder="Bio" multiline />

      <Text onPress={onSubmit} style={styles.textButton}>
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
    flex: 1,
    borderColor: colors.border,
    borderBottomWidth: 1,
    padding: 5,
  },
});

export default EditProfileScreen;
