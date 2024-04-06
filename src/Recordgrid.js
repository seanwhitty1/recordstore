import './Recordgrid.css'
import React, { useEffect, useState, useParams } from "react";
import Record from './Record'
import axios from 'axios';

const images = require.context('/Users/seanwhitty/Documents/React/recordcomponents/recordstore/src/images', true);

function Recordgrid(){
    const [count, setCount] = useState([1,2,4]);


    useEffect(() => {
        console.log("fetching")
         fetch(`http://127.0.0.1:3001/records/`)
        .then(response => response.json())
        .then(res => {
            console.log("promise resolved")
            console.log(typeof res)
            console.log(res)
    
            setCount(res);
           ;
        })
    },[])
    
      /*
           const records = await getAllRecords()
           */
           //here we are sourcing our files from src image folder.
           //ultimately their path should be stored in the db and retrieved this way. 
            console.log("this is now our saved state: " + typeof count)
           for(let i in count){
            console.log(Object.keys(i))
           }
           let result = [];
          
           for(var i in count)
        result.push(count[i]);
    
        console.log("results: " + result[0])
        console.log("type of results collection: " + typeof result)
        console.log("type of first result " + typeof result[0])
        console.log("titlte of result[0]: " + result[0])
          
        return(
            <>
            <div className='gridbox'>
            {result.map
            
            (r => <Record id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src}/>)}
            </div>
    
           </>
    
        )
    }


// <Record id={record.id} artist={record.artist} title={record.title} price={record.price} descr={record.descr} genre={record.genre} image={record.image_src} />



export default Recordgrid;