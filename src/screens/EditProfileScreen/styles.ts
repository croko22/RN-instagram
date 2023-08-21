import { StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

export default StyleSheet.create({
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
