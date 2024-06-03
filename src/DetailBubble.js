import './DetailBubble.css'
import './Record.css'

function DetailBubble(props){
    const {artist, title, genre, price} = props;
    return(
        <>
        <ul id="detail-bubble-list">
        <li className='detail-bubble-list-item'>{artist}</li>
        <li>{title}</li>
        <li>{genre}</li>
        <li>${price}</li>
        </ul>
       </>
    )
}

export default DetailBubble;