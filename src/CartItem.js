import './Cart.css'
import './App.css'
import removeItem from './svg/garbage-svgrepo-com.svg'
import { useDispatch } from 'react-redux'
import { baseURL } from './helpers'
import axios from 'axios'
import { useAuth } from './AuthProvider';

function CartItem({title, price, image_src, quantity, id}){
    const {user } = useAuth()
    const dispatch = useDispatch()

    function removeItemFromCart(id){
        if(user){axios.post(`${baseURL}users/removeRecordFromCart`, {user_id: user.data.id, id})}
        dispatch({type:"REMOVEFROMCART", payload:{id}})
       
    }
     return(  <>
        <div className="grid-item-cartItem">
            <button className='grid-item-cartItem-button'><img src={removeItem} className='removeButton' onClick={() => removeItemFromCart(id)}></img></button>
            <img className='grid-item-cartItem-img' src={image_src}></img>
            <div className='grid-item-cartItem-title'>{title} x{quantity}</div>
            <div className='grid-item-cartItem-info'><p>${price}</p></div>  
        </div>
        </>)
}

export default CartItem;