import { Text, TextInput, View } from "react-native";
import { Control, Controller } from "react-hook-form";
import { User } from "../../API";
import styles from "./styles";
import colors from "../../theme/colors";

type IEditableUserFields = "name" | "username" | "website" | "bio";
export type IEditableUser = Pick<User, IEditableUserFields>;

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

export default CustomInput;
