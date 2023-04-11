import { Image, FlatList } from "react-native";
import user from "../../assets/data/user.json";
import FeedGridView from "../../components/FeedGridView/FeedGridView";
import ProfileHeader from "./ProfileHeader";

const ProfileScreen = () => {
  //*Pics gallery
  return <FeedGridView ListHeaderComponent={ProfileHeader} data={user.posts} />;
};

export default ProfileScreen;
