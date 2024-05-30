import './Record.css'
import './Recordgrid.css'
import './DetailBubble.css'
import { NavLink } from 'react-router-dom';
import DetailBubble from './DetailBubble';
import { useSelector, useDispatch } from 'react-redux';
import cartIcon  from './svg/shopping-cart.svg'


function Record(props){
const dispatch = useDispatch();
const {id, artist, title, genre, price, image_src} = props;
const inFocus = useSelector(store => store.focus);

const clickHandler = (e) => {
    e.preventDefault()
    dispatch({type:"ADDTOCART", payload:{id, artist,title,genre, price, image_src}})
}
 
return(
    <>
    <div className='recordgrid-item' id={"record-" + id}  onMouseOver={() => dispatch({ type: "UPDATEFOCUS",payload: id})} onMouseOut={() => dispatch({ type: "UPDATEFOCUS",payload: null})}>
    <NavLink to={"http://127.0.0.1:3000/records/view/" + id} className='recordItem-Image' >
        <img src={image_src}></img> 
    </NavLink>
         {id == inFocus && <DetailBubble  artist={artist} title={title} genre={genre} price={price} id={id}/>}
    <div className='recordAddToCartButton'><a className={`${id == inFocus? 'shown': 'hidden'}`} onClick={(e) => clickHandler(e)}><img src={cartIcon} className='addToCartImage'></img></a></div>
    </div>
    
    
    </>
)
}

export default Record;