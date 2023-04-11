import { Image, View } from "react-native";
import { IPost } from "../../types/models";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";

const FeedGridItem = ({ post }: { post: IPost }) => {
  return (
    <View style={{ flex: 1, margin: 1, aspectRatio: 1, maxWidth: "33%" }}>
      <Image
        source={{ uri: post.image || post.images[0] }}
        style={{ flex: 1 }}
      />
      {post.images && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={{ position: "absolute", top: 5, right: 5 }}
        />
      )}
    </View>
  );
};

export default FeedGridItem;
