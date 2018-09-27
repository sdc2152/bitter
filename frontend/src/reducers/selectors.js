export const isLoggedIn = ({auth}) => auth.user.is_authenticated || false;
export const getCurrentUser = ({auth}) => auth.user;
export const getInitialLogInComplete = ({auth}) => (
  auth.initialLoginCheckComplete
);

export const getUsernameErrors = ({auth}) => auth.errors.username;
export const getPasswordErrors = ({auth}) => auth.errors.password;
export const getNonFieldErrors = ({auth}) => auth.errors.non_field_errors;

