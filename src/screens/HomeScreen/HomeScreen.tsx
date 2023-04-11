import { FlatList } from "react-native";
import posts from "../../assets/data/posts.json";
import FeedPost from "../../components/FeedPost";

//? Flatlist performs the rendering of many items  */
const HomeScreen = () => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <FeedPost post={item} />}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

export default HomeScreen;
