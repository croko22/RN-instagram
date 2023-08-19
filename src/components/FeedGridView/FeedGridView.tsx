import { FlatList } from "react-native";
import FeedGridItem from "./FeedGridItem";
import { Post } from "../../API";

interface IFeedGridView {
  data: (Post | null)[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  refetch?: () => void;
  loading?: boolean;
}

const FeedGridView = ({
  data,
  ListHeaderComponent,
  refetch,
  loading,
}: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => item && <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      onRefresh={refetch}
      refreshing={loading}
    ></FlatList>
  );
};

export default FeedGridView;
