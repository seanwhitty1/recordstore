import './Cart.css'
import './App.css'
import removeItem from './svg/garbage-svgrepo-com.svg'
function CartItem({title, price, image, quantity}){
     return(  <>
        <div className="grid-item-cartItem">
            <button className='grid-item-cartItem-button'><img src={removeItem} className='removeButton '></img></button>
            <img className='grid-item-cartItem-img' src={image}></img>
            <div className='grid-item-cartItem-title'>{title} x{quantity}</div>
            <div className='grid-item-cartItem-info'><p>${price}</p></div>  
        </div>
        </>)
}


export default CartItem;