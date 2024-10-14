import { useSelector } from "react-redux";
const CartDetail = () => {
    let cartItems = useSelector(state => state.cart)
    return(
        <>
          <h1 className='main-header'>Here is your cart</h1>
   
        {cartItems.map(c => <h1>{c.title}</h1>)}
        <button>Buy now</button>
        <h1 className='main-header'>Here are your shipping details:</h1>
        <div id="cart-detail-grid"></div>
        </>
    )
}

export default CartDetail;