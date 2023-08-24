import { useMutation, useQuery } from "@apollo/client";
import { createComment, getPost, updatePost } from "./queries";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from "../../API";
import { useAuthContext } from "../../contexts/AuthContext";

const useCommentService = (postId: string) => {
  const { userId } = useAuthContext();

  const { data: postData } = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    { variables: { id: postId } }
  );
  const post = postData?.getPost as Post;

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment, { refetchQueries: ["CommentsByPost"] });

  const incrementNofComments = (amount: 1 | -1) => {
    doUpdatePost({
      variables: {
        input: {
          id: post.id,
          _version: post._version,
          nofComments: post.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async (newComment: string) => {
    try {
      await doCreateComment({
        variables: {
          input: { comment: newComment, postID: post.id, userID: userId },
        },
      });
      incrementNofComments(1);
    } catch (error) {
      console.warn("Error creating comment: ", error);
    }
  };

  return { onCreateComment };
};

export default useCommentService;
