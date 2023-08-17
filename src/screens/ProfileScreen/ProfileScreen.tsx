import { Image, FlatList } from "react-native";
import user from "../../assets/data/user.json";
import FeedGridView from "../../components/FeedGridView/FeedGridView";
import ProfileHeader from "./ProfileHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from "../../types/navigation";
import { useAuthContext } from "../../contexts/AuthContext";

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  //* Is better to send an identifier than the whole object
  // const { userId: authUserId } = useAuthContext().user;
  // const userID = route.params?.userID || authUserId;
  // const user = users.find((user) => user.id === userID);
  //*Query the user

  navigation.setOptions({ title: user.username });
  //*Pics gallery
  return <FeedGridView ListHeaderComponent={ProfileHeader} data={user.posts} />;
};

export default ProfileScreen;
