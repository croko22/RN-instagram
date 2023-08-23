import { ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { likesForPostByUser } from "./queries";
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from "../../API";
import { useRoute } from "@react-navigation/native";
import { PostLikesRouteProp } from "../../types/navigation";
import ApiErrorMessage from "../../components/ApiErrorMessage/ApiErrorMessage";
import UserListItem from "../../components/UserListItem/UserListItem";

const PostLikesScreen = () => {
  const route = useRoute<PostLikesRouteProp>();
  const { id } = route.params;
  const { data, loading, error, refetch } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, { variables: { postID: id } });

  if (loading) <ActivityIndicator />;
  if (error)
    <ApiErrorMessage title="Failed to load likes" message={error.message} />;

  const likes =
    data?.likesForPostByUser?.items.filter((like) => !like?._deleted) || [];

  return (
    <FlatList
      data={likes}
      renderItem={({ item }) => <UserListItem user={item?.User} />}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

export default PostLikesScreen;
