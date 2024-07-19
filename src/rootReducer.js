import { act } from "react";

const INITIAL_STATE = { focus: null, records: null, cart: [], genre: null, token: null, user: null};

//to do. anything with a singular value, where the value in store is not an array e.g
//we want to dynamically process using computed keys. 
// case "UPDATESTOREVALUE":
//"returns {...state, [action.key]: action.payload}

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATEFOCUS":
        console.log("whats our record id?", action.payload)
      return { ...state, focus: action.payload };
    case "GETALLRECORDS":
      console.log("inside GET ALL what are all records", action.payload) //array
      return {...state, records: [...action.payload]};
    case "ADDTOCART":
      let inCart = state.cart.findIndex(object => object.id == action.payload.id) // is working
      if(inCart === -1){
        console.log("was not already in the cart")
        action.payload.quantity = 1;
        return {...state, cart: [...state.cart, action.payload]}
      } else {
        console.log("already in the cart")
        let updatedCart = [...state.cart]
        updatedCart[inCart].quantity += 1;
        console.log("what is updated cart", updatedCart)
        return {...state,  cart:[...updatedCart]}
      }
    case "SELECTGENRE":
      console.log("inside select genre:", action.payload) //
      return {...state, genre: action.payload}
    case "UPDATEUSER":
      console.log("adding token to the react app store", action.payload)
      return {...state, token:action.payload, user: action.payload}
    default:
      return state;
  }
}

export default rootReducer;