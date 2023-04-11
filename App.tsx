import { View, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import CommentsScreen from "./src/screens/CommentsScreen/CommentsScreen";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

const App = () => {
  return (
    <View style={styles.app}>
      {/* <HomeScreen /> */}
      {/* <CommentsScreen /> */}
      {/* <ProfileScreen /> */}
      <EditProfileScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  app: {
    paddingTop: 30,
    flex: 1,
  },
});
export default App;
