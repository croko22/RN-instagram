import { useState } from "react";
import { View, Image, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import useCommentService from "../../services/CommentService/CommentService";

interface IInput {
  postId: string;
}

const Input = ({ postId }: IInput) => {
  const [comment, setComment] = useState("");

  const { onCreateComment } = useCommentService(postId);

  const onPost = async () => {
    onCreateComment(comment);
    setComment("");
  };

  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
        }}
        style={styles.image}
      />
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
        style={styles.input}
        multiline
      />
      <Text onPress={onPost} style={styles.button}>
        POST
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 5,
  },
  input: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
    paddingRight: 50,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  button: {
    position: "absolute",
    right: 15,
    bottom: 15,
    fontSize: fonts.size.sm,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});

export default Input;
