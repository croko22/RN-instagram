import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { ForgotPasswordNavigationProp } from "../../../types/navigation";
import { Auth } from "aws-amplify";

type ForgotPasswordData = {
  email: string;
};

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordData>();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onSendPressed = async (data: ForgotPasswordData) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await Auth.forgotPassword(data.email);
      Alert.alert(
        "Check your email",
        `We sent you a code to ${response.CodeDeliveryDetails.Destination}`
      );
      navigation.navigate("New password", { email: data.email });
    } catch (error) {
      Alert.alert("Oooops", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("Sign in");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: "Email is required",
          }}
        />

        <CustomButton
          text={loading ? "Loading..." : "Send"}
          onPress={handleSubmit(onSendPressed)}
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default ForgotPasswordScreen;
