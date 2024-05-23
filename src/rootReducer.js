const INITIAL_STATE = { focus: null, records: null, cart: [], genre: null};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATEFOCUS":
        console.log("whats our record id?", action.payload)
      return { ...state, focus: action.payload };
    case "GETALLRECORDS":
      console.log("inside GET ALL what are all records", action.payload) //array
      return {...state, records: [...action.payload]};
    case "ADDTOCART":
      console.log("inside ADD TO CART what are we adding:", action.payload) //should be an object
      return {...state, cart: [...state.cart, action.payload]}
    case "SELECTGENRE":
      console.log("inside select genre:", action.payload) //
      return {...state, genre: action.payload}

    default:
      return state;
  }
}

export default rootReducer;