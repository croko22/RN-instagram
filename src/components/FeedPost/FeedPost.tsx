import { Text, View, Image, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FeedNavigationProp } from "../../types/navigation";
import { Post } from "../../API";
import { DEFAULT_USER_IMAGE } from "../../config";
import styles from "./styles";
import colors from "../../theme/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Comment from "../Comment";
import DoublePressable from "../DoublePressable";
import Carousel from "../Carousel";
import VideoPlayer from "../VideoPlayer";
import useLikeService from "../../services/LikeService";
import PostMenu from "./PostMenu";

interface IFeedPost {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { toggleLike, isLiked } = useLikeService(post);

  const postLikes = (post.Likes?.items || []).filter((like) => !like?._deleted);

  const navigation = useNavigation<FeedNavigationProp>();

  //? There are two ways to navigate to a screen, navigate and push (navigate is the preferred way)
  const navigateToUser = () => {
    if (post.User?.id)
      navigation.navigate("UserProfile", { userID: post.User?.id });
  };

  const navigateToComments = () => {
    navigation.navigate("Comments", { postId: post.id });
  };

  const navigateToLikes = () => {
    navigation.navigate("PostLikes", { id: post.id });
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image source={{ uri: post.image }} style={styles.image} />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.User?.image || DEFAULT_USER_IMAGE }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>
      {/* Content */}
      {content}
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.red : colors.black}
            />
          </Pressable>
          <Ionicicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{ marginLeft: "auto" }}
            color={colors.black}
          />
        </View>
        {/* Likes */}
        {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{" "}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {" "}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}
        {/* Post description */}
        <Text
          style={styles.text}
          numberOfLines={isDescriptionExpanded ? undefined : 3}
        >
          <Text style={styles.bold}>{post.User?.username}</Text>{" "}
          {post.description}
        </Text>
        <Text
          onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          style={{ color: "gray" }}
        >
          {isDescriptionExpanded ? "Show less" : "Show more"}
        </Text>
        {/* Comments */}
        <Text onPress={navigateToComments} style={{ color: "gray" }}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          (comment) => comment && <Comment key={comment.id} comment={comment} />
        )}
        {/* Posted date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
