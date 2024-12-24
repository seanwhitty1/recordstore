
const INITIAL_STATE = { focus: null, records: null, labels:null, cart: [], genre: null, token: null, user: null};
function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATEFOCUS":
      return { ...state, focus: action.payload };
    case "GETALLRECORDS":
      return {...state, records: [...action.payload]};
      case "GETLABELS":
        return {...state, labels: [...action.payload]};
    case "ADDTOCART":
      let inCart = state.cart.findIndex(object => object.id == action.payload.id) // is working
      if(inCart === -1){
        action.payload.quantity = 1;
        return {...state, cart: [...state.cart, action.payload]}
      } else {
        let updatedCart = [...state.cart]
        updatedCart[inCart].quantity++;
        return {...state,  cart:[...updatedCart]}}
    case "SELECTGENRE":
      return {...state, genre: action.payload}
    case "UPDATEUSER":
      return {...state, token:action.payload, user: action.payload}
    case "REMOVEFROMCART":
      const {id} = action.payload
      let updatedCart = state.cart.filter(cartItem => cartItem.id != id)
      return {...state,  cart:[...updatedCart]}
    case "INITUSERCART":
      return {...state,  cart:[...action.payload]}
    default:
      return state;
  }
}
export default rootReducer;