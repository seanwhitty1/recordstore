import './Recordgrid.css'
import React, { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Record from './Record'


function Recordgrid(){
    const [count, setCount] = useState([]);
    const [genre, SetGenre] = useState(null);
    console.log("++++++++ rendering our recordgrid ++++++++++++")

    let params = useParams()
    console.log("here is our search param", params.genre)
    console.log("inside recordgrid count is ", count)
    
   

    useEffect(() => {
        let routeURL;
        if(params.genre != null){
            console.log("params.genre is not null")
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
          console.log("how do we iterate through count", count)
           for(var i in count)
        result.push(count[i]);
        console.log("result is")
    
        return(
            <>
            <div className='recordgrid-container'>
        

            {result.map
            
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} setCount={setCount}/>)}
            </div>
           </>
        )
    }
/**
SELECT r.artist, g.genre_name
FROM records R JOIN records_genres rg ON r.id = rg.record_id
JOIN genres g ON rg.genre_id = g.id AND g.genre_name = $1;

SELECT r.id, r.artist, r.title, r.price, r.descr, r.image_src, g.genre_name
FROM records r JOIN records_genres rg ON r.id = rg.record_id
JOIN genres g ON rg.genre_id = g.id;
 */
export default Recordgrid;