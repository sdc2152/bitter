const defaultState = {
  user: {}
};

function user(state=defaultState, action) {
  Object.freeze(state);
  switch(action.type) {
    default:
      return state;
  }
}

export default user;
