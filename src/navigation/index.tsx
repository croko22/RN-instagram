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

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navigation = () => {
  const { user } = useAuthContext();

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Screens are stacked on top of each other */}
      <Stack.Navigator>
        {/* Nested tabs navigators */}
        {!user ? (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Comments" component={CommentsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
