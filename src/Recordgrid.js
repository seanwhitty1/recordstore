import './Recordgrid.css'
import React from "react";

import Record from './Record'
import { useSelector } from 'react-redux';

function Recordgrid(){
    const records = useSelector(state => state.records)
    console.log("rendering the record grid app")

        return(
            <>
            <div className='recordgrid-container'>
            {records && records.slice(0,8).map     
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src}/>
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
export default Recordgrid;