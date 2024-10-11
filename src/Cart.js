import './Cart.css'
import './App.css'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { NavLink } from 'react-router-dom';
import { total } from './helpers';

function Cart(){
let cartItems = useSelector(state => state.cart)
     return(  
     <>
      <div className="grid-item-cart">
       {total(cartItems) > 0 &&<div className='grid-item-cart-header'>Items in cart: {cartItems.length}</div>}
        <div className='grid-item-cart-itembox'>
        {cartItems.map(cItem => 
           <CartItem {...cItem}/>)}
        </div>
        {total(cartItems) > 0 &&<div><p className='grid-item-cart-total'>Total: ${cartItems.length > 0? total(cartItems): 0}</p><br></br>
        <div className='viewCart'>
        <NavLink to="/fullcart"> <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><a>view cart</a></button></NavLink>
        </div>
</div>}
        </div>
        </>)
}


export default Cart;