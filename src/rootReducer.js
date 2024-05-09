const INITIAL_STATE = { focus: null };

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATEFOCUS":
        console.log("whats our record id?", action.payload)
      return { ...state, focus: action.payload };

    default:
      return state;
  }
}

export default rootReducer;