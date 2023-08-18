import Navigation from "./src/navigation";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import AuthContextProvider from "./src/contexts/AuthContext";
import * as WebBrowser from "expo-web-browser";
import { Linking, Platform } from "react-native";
import Client from "./src/apollo/Client";

/**Amplify documentation has this example */
const urlOpenerExpo = async (url: string, redirectUrl: string) => {
  //@ts-ignore
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  console.log("Type");
  console.log(type);
  console.log(newUrl);

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
};

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    // redirectSignIn: "achieve://",
    // redirectSignOut: "achieve://",
    redirectSignIn: "exp://192.168.1.15:19000/--/",
    redirectSignOut: "exp://192.168.1.15:19000/--/",
    urlOpener: urlOpenerExpo,
  },
};

// Amplify.configure(config);
Amplify.configure(updatedConfig);

const App = () => {
  return (
    <AuthContextProvider>
      <Client>
        <Navigation />
      </Client>
    </AuthContextProvider>
  );
};

export default App;
