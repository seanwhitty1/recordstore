import './Record.css'
import './Recordgrid.css'
import './DetailBubble.css'
import { NavLink } from 'react-router-dom';
import DetailBubble from './DetailBubble';
import { useSelector, useDispatch } from 'react-redux';
import cartIcon  from './svg/shopping-cart.svg'
import tickIcon from './svg/tick-svgrepo-com.svg'
import { baseURL, baseURLFront } from './helpers';
import axios from 'axios';

function Record({id, artists, title, genre, price, images}){
const dispatch = useDispatch();
const cart = useSelector(store => store.cart)
const user = useSelector(store => store.user)
const inFocus = useSelector(store => store.focus);
const inCart = cart.filter(cartItem => cartItem.id == id)
const parsedImages = images.map(image => JSON.parse(image))

let artist = artists[0].artist_name

console.log("in our record,", title, price, genre) // artist and genre are undefined 
const clickHandler = (e) => {
    e.preventDefault()
    dispatch({type:"ADDTOCART", payload:{id, artist,title,genre, price, image_src:parsedImages[0].uri}})
    if(user){
        axios.post(`${baseURL}users/addItemToCart`, {user_id: user.data.id, id:id})
    }
}
return(
    <>
    <div className='recordgrid-outer'>
    <div className='recordgrid-item' id={"record-" + id}  onMouseOver={() => dispatch({ type: "UPDATEFOCUS",payload: id})} onMouseOut={() => dispatch({ type: "UPDATEFOCUS",payload: null})}>
    <NavLink to={`${baseURLFront}records/view/` + id} className='recordItem-Image'><img src={parsedImages[0].uri}></img> </NavLink>
    <div className='recordAddToCartButton'><a className={`${id == inFocus? 'shown': 'hidden'}`} onClick={(e) => clickHandler(e)}><img src={inCart.length > 0 ? tickIcon  : cartIcon} className='addToCartImage'></img></a></div>
    </div>
    {id == inFocus && <DetailBubble className='detail-bubble' artist={artist} title={title} genre={genre} price={price} id={id}/>}
    </div>
    </>
)
}
export default Record;