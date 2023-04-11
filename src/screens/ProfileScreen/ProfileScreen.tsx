import { Image, FlatList } from "react-native";
import user from "../../assets/data/user.json";
import FeedGridView from "../../components/FeedGridView/FeedGridView";
import ProfileHeader from "./ProfileHeader";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  //* Is better to send an identifier than the whole object
  const { userID } = route.params;
  // const user = users.find((user) => user.id === userID);
  //*Query the user

  navigation.setOptions({ title: user.username });
  //*Pics gallery
  return <FeedGridView ListHeaderComponent={ProfileHeader} data={user.posts} />;
};

export default ProfileScreen;
