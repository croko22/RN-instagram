import { View, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";

const App = () => {
  return (
    <View style={styles.app}>
      <HomeScreen />;
    </View>
  );
};
const styles = StyleSheet.create({
  app: {
    paddingTop: 50,
    flex: 1,
  },
});
export default App;
