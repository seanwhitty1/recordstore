import './Record.css'
function Record(props){
const {id, artist, title, genre, price, color, image} = props;

console.log(props)

//this is the URL for the record which should contain a hyperlink 
//to view that particular record in detail. 
//the anchor here goes to update the main component of our react app. 
//which when runs will look for change in state and initiate its current state. 
//

//the url will activate the React route, initiating detailRecord component to run. 

const url = `/view/${id}`

//here we establish the url for the record, when clicked should render
//detailedview component in main 

return(
    <>
    <div className='record-div'>
        <a href={url} className='record'>
        <img className='img' src={image} alt={title}></img>
        </a>
  
    </div>
    </>
)

}

export default Record;