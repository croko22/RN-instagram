import { useMutation, useQuery } from "@apollo/client";
import {
  createLike,
  deleteLike,
  likesForPostByUser,
  updatePost,
} from "./queries";
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
import { useAuthContext } from "../../contexts/AuthContext";

const useLikeService = (post: Post) => {
  const { userId } = useAuthContext();

  const { data: usersLikeData } = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {
    variables: { postID: post.id, userID: { eq: userId } },
  });
  const userLike = (usersLikeData?.likesForPostByUser?.items || []).filter(
    (like) => !like?._deleted
  )?.[0];
  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

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

  const onAddLike = () => {
    doCreateLike();
    incrementNofLikes(1);
  };

  const onDeleteLike = () => {
    if (!userLike) return;
    doDeleteLike({
      variables: { input: { id: userLike.id, _version: userLike._version } },
    });
    incrementNofLikes(-1);
  };

  const toggleLike = () => {
    if (userLike) {
      onDeleteLike();
    } else {
      onAddLike();
    }
  };

  return {
    incrementNofLikes,
    toggleLike,
    isLiked: !!userLike,
  };
};

export default useLikeService;
