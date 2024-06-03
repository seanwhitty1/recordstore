import { useSelector } from "react-redux";
const CartDetail = () => {
    let cartItems = useSelector(state => state.cart)
    console.log("rendering the full cart", cartItems)
    return(
        <>
        <h1>This is the cart</h1>
        
        {cartItems.map(c => <h1>{c.title}</h1>)}
        <div id="cart-detail-grid"></div>
        </>
    )
}

export default CartDetail;