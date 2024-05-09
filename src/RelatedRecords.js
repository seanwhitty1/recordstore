import './Recordgrid.css'
import React, { useEffect, useState} from "react";
import Record from './Record'


function RelatedRecords(props){

 let {collection} = props;
 const [count, setCount] = useState([])
 console.log("rendering our related records componenet focus=", collection)
 
        return(
            <>
            <div className='related-recordgrid-container'>
            {collection.map     
            (r => <Record className='related-recordgrid-item' id={r.record_id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} setCount={setCount} />
            ) 
            }
            </div>
           </>
        )
    }
/**

SELECT r.id, r.artist, r.title, r.price, r.descr, r.image_src, g.genre_name
FROM records r JOIN records_genres rg ON r.id = rg.record_id
JOIN genres g ON rg.genre_id = g.id;

SELECT a.artist_name, r.descr
FROM artists a JOIN artists_records ar ON a.id = ar.artist_id
JOIN records r ON ar.record_id = r.id;
 */
export default RelatedRecords;