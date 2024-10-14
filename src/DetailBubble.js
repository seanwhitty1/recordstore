import './DetailBubble.css'
import './Record.css'

function DetailBubble(props){
    const {artist, title, genre, price} = props;
    console.log("what are our props inside detail bubble", artist, title, genre, price)
    return(
        <>
        <div className='detail-bubble'>
        <ul id="detail-bubble-list">
        <li className='detail-bubble-list-item'>{artist}</li>
        <li>{title}</li>
        <li>{genre}</li>
        <li>${price}</li>
        </ul>
        </div>
       </>
    )
}

export default DetailBubble;