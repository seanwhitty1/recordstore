import './Cart.css'
import './App.css'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { total } from './helpers'
import cartIcon  from './svg/shopping-cart.svg'



function Cart(){

let cartItems = useSelector(state => state.cart)
let cartTotal = 0;

if(cartItems.length > 0){cartTotal = total(cartItems)};
//todo - make row 2 responsive to the height needed to store cartItems 
//to do if cart item = 2 and beyond, no top margin

 
     return(  <>
       
        <div className="grid-item-cart">
        <div className='grid-item-cart-header'> <img src={cartIcon}></img>Items in cart: {cartItems.length}</div>
        <div className='grid-item-cart-itembox'>
        {cartItems.map(cItem => 
           <CartItem title={cItem.title}  artist={cItem.artist} price={cItem.price * cItem.quantity} image={cItem.image_src}
            quantity={cItem.quantity}/>
        )}
        </div>
        {cartTotal > 0 &&<p className='grid-item-cart-total'>Total: ${cartTotal}</p>}
        </div>
 
        
     
       
      
     
        </>)
}


export default Cart;