import Navigation from "./src/navigation";
import { Amplify } from "aws-amplify";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import config from "./src/aws-exports";
import colors from "./src/theme/colors";

Amplify.configure(config);

const App = () => {
  return <Navigation />;
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
      placeholder: "Enter your full name",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
      placeholder: "Enter your email",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
      placeholder: "Enter your username",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
      placeholder: "Enter your password",
    },
  ],
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: "#5c78ff",
    borderRadius: 100,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primary,
  },
};

export default withAuthenticator(App, { signUpConfig, theme: customTheme });
