import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CommentsScreen from "../screens/CommentsScreen/CommentsScreen";
import { RootNavigatorParamList } from "../types/navigation";
import AuthStackNavigator from "./AuthStackNavigator";
import { useAuthContext } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { getUser } from "./queries";
import { GetUserQuery, GetUserQueryVariables } from "../API";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navigation = () => {
  const { user, userId } = useAuthContext();
  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: { id: userId },
  });
  const userData = data?.getUser;

  if (user === undefined || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  let stackScreens = null;
  if (!user) {
    stackScreens = (
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
    );
  } else if (!userData?.username) {
    stackScreens = (
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    );
  } else {
    stackScreens = (
      <>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </>
    );
  }

  return (
    <NavigationContainer>
      {/* Screens are stacked on top of each other */}
      <Stack.Navigator>{stackScreens}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
