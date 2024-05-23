import './DetailBubble.css'

function DetailBubble(props){
    const {artist, title, genre, price} = props;
    return(
        <>
        <div id="detail-bubble">
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