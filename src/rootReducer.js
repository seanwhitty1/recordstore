const INITIAL_STATE = { focus: null, records:null };

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATEFOCUS":
        console.log("whats our record id?", action.payload)
      return { ...state, focus: action.payload };
    case "GETALLRECORDS":
      console.log("inside GET ALL what are all records", action.payload) //array
      return {...state, records: [...action.payload]};

    default:
      return state;
  }
}

export default rootReducer;