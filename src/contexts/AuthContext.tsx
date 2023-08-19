import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = CognitoUser | null | undefined;

type AuthContextType = {
  user: UserType;
  userId: string;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userId: "",
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(undefined);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };
  checkUser();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = (data) => {
      const { event } = data.payload;
      if (event === "signIn") checkUser();
      if (event === "signOut") setUser(null);
    };
    Hub.listen("auth", listener);

    return () => Hub.remove("auth", listener);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userId: user?.attributes?.sub }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
