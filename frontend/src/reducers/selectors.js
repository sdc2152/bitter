// Auth selectors
export const isLoggedIn = ({auth}) => auth.user.is_authenticated || false;
export const getCurrentUser = ({auth}) => auth.user;
export const getInitialLogInComplete = ({auth}) => (
  auth.initialLoginCheckComplete
);

export const getUsernameErrors = ({auth}) => auth.errors.username;
export const getPasswordErrors = ({auth}) => auth.errors.password;
export const getNonFieldErrors = ({auth}) => auth.errors.non_field_errors;

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
export const getPosts = ({posts}) => posts.postIds.map(id => posts.byIds[id]);
export const getPostFormBody = ({posts}) => posts.form.body;
