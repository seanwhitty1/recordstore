import './Record.css'
import Record from './Record';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';


function Detailrecord(){
    const [count, setCount] = useState({id:"test", artist:"test-artist", title:"test-title",  price:"test-price", descr:"test-descr"});
    console.log("creating detail record component")
    const params = useParams()
    const id = params.id
    console.log("passed product id is: " + id) //working
    useEffect(() => {
        console.log("fetching")
         fetch(`http://127.0.0.1:3001/records/view/${id}`)
        .then(response => response.json())
        .then(res => {
            console.log("promise resolved")
            console.log(typeof res)
            console.log(res)
    
            setCount(res);
           ;
        })
    },[])
//use effect was passed a second argument of an empty array, thus there are no dependencies
//dependencies  trigger a re-run of the use effect function 
      /*
           const records = await getAllRecords()
           */
           //here we are sourcing our files from src image folder.
           //ultimately their path should be stored in the db and retrieved this way. 
            console.log("this is now our saved state: " + typeof count)
      
           let result = [];
           result.push(count)
          
         
    
        console.log("results: " + result[0])
        let r = result[0]
       //to do: in detail record, we need to conditionally remove link to the same record
       //to do: we need to create a back to home button,. 
          
        return(
            <>
            <div className='gridbox'>
            <h1>{r.title}</h1>
            <Record id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src}/>
            <p>{r.descr}</p>
        
            </div>
    
           </>
    
        )
    }



 

// <Record id={record.id} artist={record.artist} title={record.title} price={record.price} descr={record.descr} genre={record.genre} image={record.image_src} />





export default Detailrecord