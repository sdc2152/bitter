export const isLoggedIn = ({auth}) => auth.user.is_authenticated || false;
export const getCurrentUser = ({auth}) => auth.user;
export const getInitialLogInComplete = ({auth}) => (
  auth.initialLoginCheckComplete
);
