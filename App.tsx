import Navigation from "./src/navigation";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import AuthContextProvider from "./src/contexts/AuthContext";

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    // redirectSignIn: "achieve://",
    // redirectSignOut: "achieve://",
    // redirectSignIn: "exp://127.0.0.1:19000/--/",
    // redirectSignOut: "exp://127.0.0.1:19000/--/",
    redirectSignIn: "exp://192.168.1.13:19000/--/",
    redirectSignOut: "exp://192.168.1.13:19000/--/",
    // redirectSignIn: "exp://2c_wcsc.anonymous.19000.exp.direct/--/",
    // redirectSignOut: "exp://2c_wcsc.anonymous.19000.exp.direct/--/",
    // redirectSignIn: "exp://10.0.2.2:80/--/",
    // redirectSignOut: "exp://10.0.2.2:80/--/",
  },
};

// Amplify.configure(config);
Amplify.configure(updatedConfig);

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
