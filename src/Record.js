import axios from 'axios';
import './Record.css'
import './Recordgrid.css'
import $ from 'jquery'
import { NavLink } from 'react-router-dom';

function Record(props){
const {id, artist, title, genre, price, color, image, setCount} = props;
//this is the URL for the record which should contain a hyperlink 
//to view that particular record in detail. 
//the anchor here goes to update the main component of our react app. 
//which when runs will look for change in state and initiate its current state. 
//the url will activate the React route, initiating detailRecord component to run. 
//here we establish the url for the record, when clicked should render
//detailedview component in main 

let recordID = "record-" + id;
const deleteHandler = async(id) => {
    let selectedRecord = $(`#${recordID}`)
    console.log(selectedRecord)
    selectedRecord.fadeOut(400);
    await axios.delete(`http://127.0.0.1:3001/records/delete/${id}`);
     
    setTimeout(async() => {   
        fetch(`http://127.0.0.1:3001/records/`)
        .then(response => response.json())
        .then(res => setCount(res))
    },3000)
}
const recordPath = "http://127.0.0.1:3000/records/view/" + id

return(
    <>
    <div className='recordgrid-item' id={recordID}>
    <NavLink to={recordPath}>
    
        <div className='recordItemGridContainer'>
        <img  className='recordItem-Image' src={image}></img>
        </div>
      
    
        
    </NavLink>
    <button className="recordItem-gridButton" onClick={() => {deleteHandler(id)}}>x</button>
    </div>
 
   

    </>
)

}

export default Record;