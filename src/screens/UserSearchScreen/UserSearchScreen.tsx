import { ActivityIndicator, FlatList } from "react-native";
import UserListItem from "../../components/UserListItem/UserListItem";
import { useQuery } from "@apollo/client";
import { listUsers } from "./queries";
import ApiErrorMessage from "../../components/ApiErrorMessage/ApiErrorMessage";
import { ListLikesQueryVariables, ListUsersQuery } from "../../API";

const UserSearchScreen = () => {
  const { data, loading, error, refetch } = useQuery<
    ListUsersQuery,
    ListLikesQueryVariables
  >(listUsers);
  const users = (data?.listUsers?.items || []).filter((u) => u && !u?._deleted);

  if (loading) return <ActivityIndicator />;
  if (error || !users)
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || "User not found"}
        onRetry={() => refetch()}
      />
    );

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => item && <UserListItem user={item} />}
      onRefresh={() => refetch()}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;
