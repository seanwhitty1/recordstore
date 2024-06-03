import './Cart.css'
import './App.css'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { total } from './helpers' 
import { NavLink } from 'react-router-dom'



function Cart(){
     

let cartItems = useSelector(state => state.cart)
let cartTotal = 0;
console.log("rendering the mini cart", cartItems)

if(cartItems.length > 0){cartTotal = total(cartItems)};
//todo - make row 2 responsive to the height needed to store cartItems 
//to do if cart item = 2 and beyond, no top margin

 
     return(  <>
       
        <div className="grid-item-cart">
       {cartTotal > 0 &&<div className='grid-item-cart-header'>Items in cart: {cartItems.length}</div>}
        <div className='grid-item-cart-itembox'>
        {cartItems.map(cItem => 
           <CartItem title={cItem.title}  artist={cItem.artist} price={cItem.price * cItem.quantity} image={cItem.image_src}
            quantity={cItem.quantity}/>
        )}
        </div>
        {cartTotal > 0 &&<div><p className='grid-item-cart-total'>Total: ${cartTotal}</p><br></br>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">

</button></div>}
        </div>
 
        
     
       
      
     
        </>)
}


export default Cart;