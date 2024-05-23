import './Cart.css'
import './App.css'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { total } from './helpers'

function Cart(){
console.log("rendering the cart component")
//to do - create a reducer function that will acumulate all prices of cart items. 
let cartItems = useSelector(state => state.cart)
console.log("inside our cart, items:", cartItems)
let cartTotal = 0;
if(cartItems.length > 0){ cartTotal = total(cartItems)};
console.log("what is the car total,", cartTotal)
 

     return(  <>
        <div className="grid-item-cart">
        <div className='grid-item-cart-header'>Items in cart: {cartItems.length}</div>
        <div className='grid-item-cart-itembox'>
        {cartItems.map(cItem => 
           <CartItem title={cItem.title}  artist={cItem.artist} price={cItem.price} image={cItem.image_src}/>
        )}
        </div>
        {cartItems.length > 0 && <p>Total: ${cartTotal}</p>}

        </div>
        </>)
}


export default Cart;