import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommentsScreen from "../screens/CommentsScreen/CommentsScreen";
import colors from "../theme/colors";
import { SearchTabNavigationParamList } from "../types/navigation";
import UserSearchScreen from "../screens/UserSearchScreen/UserSearchScreen";

const Tab = createMaterialTopTabNavigator<SearchTabNavigationParamList>();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingTop: insets.top },
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Users" component={UserSearchScreen} />
      <Tab.Screen name="Posts" component={CommentsScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
