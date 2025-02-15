import './Record.css'
import './Recordgrid.css'

import { NavLink } from 'react-router-dom';
import DetailBubble from './DetailBubble';
import { useSelector, useDispatch } from 'react-redux';
import cartIcon  from './svg/shopping-cart.svg'
import tickIcon from './svg/tick-svgrepo-com.svg'
import { baseURL, baseURLFront } from './helpers';
import axios from 'axios';
import styles from "./index.css"

function Record({id, artists, title,price, images}){
console.log("rendering a record," ,id, artists, title, price, images)
const dispatch = useDispatch();
const cart = useSelector(store => store.cart)
const user = useSelector(store => store.user)
const inFocus = useSelector(store => store.focus);
const inCart = cart.filter(cartItem => cartItem.id == id)
const parsedImages = images.map(image => JSON.parse(image))
let artist = artists[0].artist_name

const clickHandler = (e) => {
    e.preventDefault()
    dispatch({type:"ADDTOCART", payload:{id, artist,title, price, image_src:parsedImages[0].uri}})
    if(user){axios.post(`${baseURL}users/addItemToCart`, {user_id: user.data.id, id:id})}
}
return(
    <>
    <div className='recordgrid-item m-10px mb-20' id={"record-" + id}  onMouseOver={() => dispatch({ type: "UPDATEFOCUS",payload: id})} onMouseOut={() => dispatch({ type: "UPDATEFOCUS",payload: null})}>
    <div className='recordAddToCartButton col-start-6 absolute'><a className={`${id == inFocus? 'flex': 'hidden'} z-1`} onClick={(e) => clickHandler(e)}><img src={inCart.length > 0 ? tickIcon  : cartIcon} className='addToCartImage'></img></a></div>
      <div className='col-span-8 max-md:col-span-6 mb-10px z-0 relative'>
    <NavLink to={`${baseURLFront}records/view/` + id}><img className='recordItem-Image hover:o-45 absolute z-0' src={parsedImages[0].uri}></img> </NavLink>
    </div>
       <div className='relative row-start-2 col-span-6 z-1'>
       {id == inFocus && <DetailBubble artist={artist} title={title} price={price} id={id}/>}
       </div>
    </div>
    </>
)
}
export default Record;