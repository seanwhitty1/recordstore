import './Cart.css'
import './App.css'
function CartItem({artist, title, price, image}){
     return(  <>
        <div className="grid-item-cartItem">
            <img className='grid-item-cartItem-img' src={image}></img>
            <div className='grid-item-cartItem-title'>{title}</div>
            <div className='grid-item-cartItem-info'><p>${price}</p></div>  
        </div>
        </>)
}


export default CartItem;