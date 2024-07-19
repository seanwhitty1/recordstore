import './Record.css'
import './Recordgrid.css'
import './DetailBubble.css'
import { NavLink } from 'react-router-dom';
import DetailBubble from './DetailBubble';
import { useSelector, useDispatch } from 'react-redux';
import cartIcon  from './svg/shopping-cart.svg'
import tickIcon from './svg/tick-svgrepo-com.svg'

function Record({id, artist, title, genre, price, image_src}){
const dispatch = useDispatch();
const cart = useSelector(store => store.cart)
const inFocus = useSelector(store => store.focus);
const inCart = cart.filter(cartItem => cartItem.id == id)
const clickHandler = (e) => {
    e.preventDefault()
    dispatch({type:"ADDTOCART", payload:{id, artist,title,genre, price, image_src}})
}
return(
    <>
    <div className='recordgrid-outer'>
    <div className='recordgrid-item' id={"record-" + id}  onMouseOver={() => dispatch({ type: "UPDATEFOCUS",payload: id})} onMouseOut={() => dispatch({ type: "UPDATEFOCUS",payload: null})}>
    <NavLink to={"http://127.0.0.1:3000/records/view/" + id} className='recordItem-Image' >
        <img src={image_src}></img> 
    </NavLink>
    <div className='recordAddToCartButton'><a className={`${id == inFocus? 'shown': 'hidden'}`} onClick={(e) => clickHandler(e)}><img src={inCart.length > 0 ? tickIcon  : cartIcon} className='addToCartImage'></img></a></div>
    </div>
    {id == inFocus && <DetailBubble className='detail-bubble' artist={artist} title={title} genre={genre} price={price} id={id}/>}
    </div>
    </>
)
}

export default Record;