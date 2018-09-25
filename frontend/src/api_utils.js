export const getCSRFToken = () => {
  const parts = `; ${document.cookie}`.split("; csrftoken=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
