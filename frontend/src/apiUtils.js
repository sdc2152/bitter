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
