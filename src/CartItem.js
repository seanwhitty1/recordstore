import './Cart.css'
import './App.css'
import removeItem from './svg/garbage-svgrepo-com.svg'
import { useDispatch } from 'react-redux'
function CartItem({title, price, image, quantity, id}){
    const dispatch = useDispatch()
    console.log("inside cart item", title, price, image, id)

    function removeItemFromCart(id){
        console.log("running remove function")
        dispatch({type:"REMOVEFROMCART", payload:{id}})
      
    }
     return(  <>
        <div className="grid-item-cartItem">
            <button className='grid-item-cartItem-button'><img src={removeItem} className='removeButton' onClick={() => removeItemFromCart(id)}></img></button>
            <img className='grid-item-cartItem-img' src={image}></img>
            <div className='grid-item-cartItem-title'>{title} x{quantity}</div>
            <div className='grid-item-cartItem-info'><p>${price}</p></div>  
        </div>
        </>)
}

export default CartItem;