import './Recordgrid.css'
import React, { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Record from './Record'

function Recordgrid(){
   
    const [count, setCount] = useState([]);
    const [genre, SetGenre] = useState(null);
    let [recordsByLetter, setRecordsByLetter] = useState([]) //used for the browse all iteration of this component
    let params = useParams()

    useEffect(() => {
        let routeURL;
        if(params.genre != null){
            routeURL = `http://127.0.0.1:3001/records/genre/${params.genre}`

        } else {
            routeURL = `http://127.0.0.1:3001/records/`
        }
        console.log("fetching records")
         fetch(`${routeURL}`)
        .then(response => response.json())
        .then(res => {
            console.log("promise resolved")
            console.log(typeof res)
            console.log("retrieved objects", res)
            setCount(res);
            SetGenre(params.genre)
           ;
        })
    },[params.genre])
           let result = [];
           for(var i in count){
            result.push(count[i]);
           }
  
        return(
            <>
            <div className='recordgrid-container'>
            {result.slice(0,8).map     
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} setCount={setCount}/>
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