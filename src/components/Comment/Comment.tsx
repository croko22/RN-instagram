import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
import { useState } from "react";
import { Comment as CommentType } from "../../API";
import { DEFAULT_USER_IMAGE } from "../../config";

interface ICommentProps {
  comment: CommentType;
  includeDetails?: boolean;
}

const Comment = ({ comment, includeDetails = false }: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.comment}>
      {includeDetails && (
        <Image
          source={{ uri: comment.User?.image || DEFAULT_USER_IMAGE }}
          style={styles.avatar}
        />
      )}

      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{" "}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>5 Likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>

      <Pressable onPress={() => setIsLiked(!isLiked)} hitSlop={5}>
        <AntDesign
          name={isLiked ? "heart" : "hearto"}
          style={styles.icon}
          size={15}
          color={isLiked ? colors.red : colors.black}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  icon: {
    marginHorizontal: 5,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 5,
  },
  middleColumn: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  footerText: {
    color: colors.gray,
    fontSize: 12,
    marginRight: 10,
  },
});

export default Comment;
