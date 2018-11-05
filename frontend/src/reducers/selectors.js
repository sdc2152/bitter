// Auth selectors
export const isLoggedIn = ({auth}) => auth.user.is_authenticated || false;
export const getInitialLogInComplete = ({auth}) => (
  auth.initialLoginCheckComplete
);
export const getUsernameErrors = ({auth}) => auth.errors.username;
export const getPasswordErrors = ({auth}) => auth.errors.password;
export const getNonFieldErrors = ({auth}) => auth.errors.non_field_errors;

// Current User selectors
export const getCurrentUserAvatar = ({auth}) => (
  auth.user && auth.user.profile && auth.user.profile.avatar
);
export const getCurrentUser = ({auth}) => auth.user;
export const getCurrentUserId = ({auth}) => auth.user.id;
export const getCurrentUserFollows = ({auth}) => (
  auth.user.profile ? auth.user.profile.follows : undefined
);

// Profile Form selectors
export const getProfileFormFields = ({profileForm}) => profileForm.fields;

// User selectors
export const isDisplayUserFound = ({displayUser}) => (
  displayUser.user.username !== undefined
);
export const isUserNotFound = ({displayUser}) => (
  displayUser.errors.detail !== undefined
);
export const isFetchingDisplayUser = ({displayUser}) => displayUser.isFetching;
export const getDisplayUser = ({displayUser}) => displayUser.user;

// Post selectors
export const getIsFetchingPosts = ({posts}) => posts.isFetching;
export const getPosts = ({posts}) => posts.postIds.map(id => posts.byIds[id]);
export const getPostFormBody = ({posts}) => posts.form.body;
export const getPostModalBody = ({posts}) => posts.formModal.body;

// Post Deatail selectors
export const isPostDetailFound = ({postDetail}) => (
  postDetail.post.user !== undefined
);
// TODO: might not need this one here
export const getIsFetchingPostDetail = ({postDetail}) => postDetail.isFetching;
export const getPostDetail = ({postDetail}) => postDetail.post;
export const getIsFetchingReplies = ({postDetail}) => (
  postDetail.replies.isFetchingReplies
);
export const getReplies = ({postDetail}) => {
  const replies = postDetail.post["replies"] || [];
  return replies.reduce((acum, replyId) => {
    const reply = postDetail.replies.byIds[replyId];
    reply && acum.push(reply);
    return acum;
  }, []);
};
export const getRepliesByPost = ({postDetail}, {replies}) => {
  return replies.reduce((acum, replyId) => {
    const reply = replies[replyId];
    reply && acum.push(reply);
    return acum;
  }, []);
};

// Suggested Follows selectors
export const getSuggestedFollows = ({suggestedFollows}) => (
  suggestedFollows.userIds.map(id => suggestedFollows.byIds[id])
);
export const getIsFetchingSuggestedFollows = ({suggestedFollows}) => (
  suggestedFollows.isFetching
);

// Suggested Tags selectors
export const getSuggestedTags = ({suggestedTags}) => (
  suggestedTags.tagIds.map(id => suggestedTags.byIds[id])
);
export const getIsFetchingSuggestedTags = ({suggestedTags}) => (
  suggestedTags.isFetching
);

// Image selectors
export const getImageFormFile = ({image}) => image.formModal.file;
export const getIsImageModalOpen = ({image}) => image.formModal.isOpen;
export const getImageErrors = ({image}) => image.errors;
