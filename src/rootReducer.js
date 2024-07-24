
const INITIAL_STATE = { focus: null, records: null, cart: [], genre: null, token: null, user: null};
function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATEFOCUS":
      return { ...state, focus: action.payload };
    case "GETALLRECORDS":
      return {...state, records: [...action.payload]};
    case "ADDTOCART":
      //if user is present, we want to find the user object in the database.. then we can add to the cart 
      //of that user object!
      let inCart = state.cart.findIndex(object => object.id == action.payload.id) // is working
      if(inCart === -1){
        action.payload.quantity = 1;
        return {...state, cart: [...state.cart, action.payload]}
      } else {
        let updatedCart = [...state.cart]
        updatedCart[inCart].quantity += 1;
        return {...state,  cart:[...updatedCart]}
      }
    case "SELECTGENRE":
      return {...state, genre: action.payload}
    case "UPDATEUSER":
      console.log("adding token to the react app store", action.payload)
      return {...state, token:action.payload, user: action.payload}
    case "REMOVEFROMCART":
      const {id} = action.payload
      let updatedCart = state.cart.filter(cartItem => cartItem.id != id)
      return {...state,  cart:[...updatedCart]}
    default:
      return state;
  }
}
export default rootReducer;