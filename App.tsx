import { ScrollView, StyleSheet } from "react-native";
import FeedPost from "./src/components/FeedPost";

const App = () => {
  return (
    <ScrollView style={styles.app}>
      <FeedPost/>    
      <FeedPost/>    
      <FeedPost/>    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    paddingTop: 50,
    flex: 1,
  },
});

export default App;
