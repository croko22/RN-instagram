import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  CreateNavigationProp,
  CreateRouteProp,
  UpdatePostRouteProp,
} from "../../types/navigation";
import { useEffect, useState } from "react";
import colors from "../../theme/colors";
import { getPost, updatePost } from "./queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from "../../API";
import { useAuthContext } from "../../contexts/AuthContext";
import ApiErrorMessage from "../../components/ApiErrorMessage/ApiErrorMessage";

const UpdatePostScreen = () => {
  const [description, setDescription] = useState("");
  const { userId } = useAuthContext();

  const navigation = useNavigation<CreateNavigationProp>();
  const route = useRoute<UpdatePostRouteProp>();
  const { id } = route.params;
  const { data, loading, error } = useQuery<
    GetPostQuery,
    GetPostQueryVariables
  >(getPost, { variables: { id } });

  const post = data?.getPost;

  const [doUpdatePost, { error: updateError, data: updateData }] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  useEffect(() => {
    if (data) {
      setDescription(post?.description || "");
    }
  }, [data]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData]);

  const submit = async () => {
    if (!post) return;
    doUpdatePost({
      variables: {
        input: { id: post.id, description, _version: post?._version },
      },
    });
  };

  if (loading) return <ActivityIndicator />;
  if (error || updateError)
    return (
      <ApiErrorMessage
        title="Failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  return (
    <View style={styles.root}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />

      <Button title="Submit" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    marginVertical: 10,
    alignSelf: "stretch",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});
export default UpdatePostScreen;
