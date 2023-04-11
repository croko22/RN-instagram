import { View, Text, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
import { IComment } from "../../types/models";

interface ICommentProps {comment: IComment}

const Comment = ({comment}: ICommentProps) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}>{comment.user.username}</Text> {comment.comment}
      </Text>
      <AntDesign
        name={"hearto"}
        style={styles.icon}
        size={12}
        color={colors.black}
      />
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
    flex: 1,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default Comment;
