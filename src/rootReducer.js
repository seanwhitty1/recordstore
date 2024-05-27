import { act } from "react";

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
      console.log(state.cart)
      console.log("inside ADD TO CART what are we adding:", action.payload) //should be an object
      //if item is already in cart, increment the quantity 
      console.log("when adding to cart what is the payload", action.payload, "what is the quantity", action.quantity)
      console.log(state.cart)
      console.log(action.payload.id)
      let inCart = state.cart.findIndex(object => object.id == action.payload.id) // is working
      console.log("what is incart", inCart)
      //if inCart does not equal -1 it already exists
      //in that case we want to spread a new array with the old items
      //and rewrite the index
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

    default:
      return state;
  }
}

export default rootReducer;