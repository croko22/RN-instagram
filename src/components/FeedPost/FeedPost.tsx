import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Comment from "../Comment";
import DoublePressable from "../DoublePressable";
import { IPost } from "../../types/models";
import { useState } from "react";
import Carousel from "../Carousel";
import VideoPlayer from "../VideoPlayer";
import { useNavigation } from "@react-navigation/native";
import { FeedNavigationProp } from "../../types/navigation";

interface IFeedPost {
  post: IPost;
  isVisible: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation<FeedNavigationProp>();

  //? There are two ways to navigate to a screen, navigate and push (navigate is the preferred way)
  const navigateToUser = () => {
    navigation.navigate("UserProfile", { userID: post.user.id });
  };

  const navigateToComments = () => {
    navigation.navigate("Comments", { postID: post.id });
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={() => setIsLiked(!isLiked)}>
        <Image source={{ uri: post.image }} style={styles.image} />
      </DoublePressable>
    );
  } else if (post.images) {
    content = (
      <Carousel
        images={post.images}
        onDoublePress={() => setIsLiked(!isLiked)}
      />
    );
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={() => setIsLiked(!isLiked)}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.user.image }} style={styles.userAvatar} />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.user.username}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          style={styles.threeDots}
        />
      </View>
      {/* Content */}

      {content}
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => setIsLiked(!isLiked)}>
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
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>felipe</Text> and{" "}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>
        {/* Post description */}
        <Text
          style={styles.text}
          numberOfLines={isDescriptionExpanded ? undefined : 3}
        >
          <Text style={styles.bold}>{post.user.username}</Text>{" "}
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
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {/* Posted date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
