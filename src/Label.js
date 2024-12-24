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

function Label({id, thumbnail_url, label_name}){

const dispatch = useDispatch();

return(
    <>
    <div className='recordgrid-item' id={"label-" + id}>
      <div className='col-span-8 max-md:col-span-6 mb-10px z-0 relative'>
    <NavLink to={`${baseURLFront}label/view/` + id}><img className='recordItem-Image hover:o-45 absolute z-0' src={thumbnail_url}></img> </NavLink>
    </div>
    </div>
    </>
)
}
export default Label;