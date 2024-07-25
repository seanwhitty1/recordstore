import './Cart.css'
import './App.css'
import removeItem from './svg/garbage-svgrepo-com.svg'
import { useDispatch } from 'react-redux'
import { useAuth } from './AuthProvider';
import { baseURL } from './helpers'
import axios from 'axios'
function CartItem({title, price, image, quantity, id}){
    const {token, user } = useAuth()
    const dispatch = useDispatch()


    function removeItemFromCart(id){
        console.log("running remove function", user)
        if(user){
            console.log("user logged in, will remove also from db", user.data.id, id)
            axios.post(`${baseURL}users/removeRecordFromCart`, {user_id: user.data.id, id})

        }
   
      
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