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
import { useQuery } from "@apollo/client";
import { getUser } from "./queries";
import { ActivityIndicator } from "react-native";
import ApiErrorMessage from "../../components/ApiErrorMessage/ApiErrorMessage";
import { GetUserQuery, GetUserQueryVariables } from "../../API";

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const { userId: authUserId } = useAuthContext();
  const userID = route.params?.userID || authUserId;
  //*Query the user

  const { data, loading, error, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {
    variables: {
      id: userID,
    },
  });
  const user = data?.getUser;
  navigation.setOptions({ title: user?.username || "Profile" });

  if (loading) return <ActivityIndicator />;
  if (error || !user)
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || "User not found"}
        onRetry={() => refetch()}
      />
    );
  return (
    <FeedGridView
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      data={user.Posts?.items || []}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
