import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CommentsScreen from "../screens/CommentsScreen/CommentsScreen";
import { RootNavigatorParamList } from "./types";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* Screens are stacked on top of each other */}
      <Stack.Navigator initialRouteName="Home">
        {/* Nested tabs navigators */}
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
