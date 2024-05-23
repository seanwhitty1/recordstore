import axios from 'axios';
import './Record.css'
import './Recordgrid.css'
import $ from 'jquery'
import './DetailBubble.css'
import { NavLink } from 'react-router-dom';
import DetailBubble from './DetailBubble';
import { useSelector, useDispatch } from 'react-redux';

function Record(props){
const dispatch = useDispatch();
const {id, artist, title, genre, price, image, setCount} = props;
const inFocus = useSelector(store => store.focus);

let recordID = "record-" + id;

const deleteHandler = async(id) => {
    let selectedRecord = $(`#${recordID}`)
    selectedRecord.fadeOut(400);
    await axios.delete(`http://127.0.0.1:3001/records/delete/${id}`);  
    setTimeout(async() => {   
        //here we want to refetch the records. we can do this with redux
        fetch(`http://127.0.0.1:3001/records/`)
        .then(response => response.json())
        .then(res => setCount(res))
    },3000)
}
const recordPath = "http://127.0.0.1:3000/records/view/" + id

return(
    <>
    <div className='recordgrid-item' id={recordID} >
    <NavLink to={recordPath}>
        <div className='recordItemGridContainer'onMouseOver={() => dispatch({ type: "UPDATEFOCUS",payload: id})} onMouseOut={() => dispatch({ type: "UPDATEFOCUS",payload: null})}>
        <img  className='recordItem-Image' src={image}></img>
         {id == inFocus && <DetailBubble  artist={artist} title={title} genre={genre} price={price} id={id}/>}
        </div>   
    </NavLink>
    </div>
    </>
)
}

export default Record;