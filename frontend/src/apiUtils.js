export const getCSRFToken = () => {
  const parts = `; ${document.cookie}`.split("; csrftoken=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};


export const normalizeArray = (array, keyField) => (
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {})
);

export const getParamString = params => (
  Object.keys(params).map(k => `${k}=${params[k]}`).join("&")
);

export const SEARCH_BY_SLUG = "@";
export const SEACH_BY_TAG = "#";
export const getParamStringFromLocation = ({pathname}) => {
  const searchBy = pathname[1];
  const searchTerm = pathname.substring(2);
  switch(searchBy) {
    case SEARCH_BY_SLUG:
      return `slug=${searchTerm}`;
    case SEACH_BY_TAG:
      return `tag=${searchTerm}`;
    default:
      return "";
  }
};
