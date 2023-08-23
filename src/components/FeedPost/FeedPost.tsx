import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Comment from "../Comment";
import DoublePressable from "../DoublePressable";
import { useState } from "react";
import Carousel from "../Carousel";
import VideoPlayer from "../VideoPlayer";
import { useNavigation } from "@react-navigation/native";
import { FeedNavigationProp } from "../../types/navigation";
import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from "../../API";
import { DEFAULT_USER_IMAGE } from "../../config";
import PostMenu from "./PostMenu";
import { useMutation, useQuery } from "@apollo/client";
import {
  createLike,
  deleteLike,
  likesForPostByUser,
  updatePost,
} from "./queries";
import { useAuthContext } from "../../contexts/AuthContext";

interface IFeedPost {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({ post, isVisible }: IFeedPost) => {
  const { userId } = useAuthContext();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [doCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: { input: { userID: userId, postID: post.id } },
    refetchQueries: ["LikesForPostByUser"],
  });

  const [doDeleteLike] = useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(deleteLike, {
    refetchQueries: ["LikesForPostByUser"],
  });

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const { data: usersLikeData } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {
    variables: { postID: post.id, userID: { eq: userId } },
  });
  const userLike = (usersLikeData?.likesForPostByUser?.items || []).filter(
    (like) => !like?._deleted
  )?.[0];
  const postLikes = (post.Likes?.items || []).filter((like) => !like?._deleted);

  const navigation = useNavigation<FeedNavigationProp>();

  const incrementNofLikes = (amount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofLikes: post.nofLikes + amount,
        },
      },
    });
  };

  //? There are two ways to navigate to a screen, navigate and push (navigate is the preferred way)
  const navigateToUser = () => {
    if (post.User?.id)
      navigation.navigate("UserProfile", { userID: post.User?.id });
  };

  const navigateToComments = () => {
    navigation.navigate("Comments", { postID: post.id });
  };

  const navigateToLikes = () => {
    navigation.navigate("PostLikes", { id: post.id });
  };

  const toggleLike = () => {
    if (userLike) {
      doDeleteLike({
        variables: { input: { id: userLike.id, _version: userLike._version } },
      });
      incrementNofLikes(-1);
    } else {
      doCreateLike();
      incrementNofLikes(1);
    }
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
              name={userLike ? "heart" : "hearto"}
              size={24}
              style={styles.icon}
              color={userLike ? colors.red : colors.black}
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
