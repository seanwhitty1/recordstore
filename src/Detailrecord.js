import './Record.css'
import { useParams } from 'react-router-dom';
import './App.css'
import './Detailrecord.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import RelatedRecords from './RelatedRecords';
import UpdateRecordForm from './forms/updateRecordForm';
import { useSelector } from 'react-redux';
import 'react-flash-message'

function Detailrecord(){
    const [r, setR] = useState({id:"placeholder", artist:"placeholder",genre:"placeholder"});
    const [showEdit, setShowEdit] = useState(false)
    const params = useParams()
    const {id} = params;
    const records = useSelector(state => state.records)
    console.log("detail record component rendering", records)
    let allFromArtist = ["placeholder"];
    let allFromGenre = ["placeholder"];

   if(r.id != "placeholder"){ //loaded
    console.log("r was loaded")
    console.log(r)
    allFromArtist = records.filter((record) => record.artist == r.artist)
    console.log("All from artist", allFromArtist)
    allFromGenre = records.filter((record) => record.genre == r.genre)
    console.log("all from genre,", allFromGenre)
   
   }
 
    useEffect(() => {
        const getRecordAndArtist = async() => {
            console.log(records) // null
            console.log(id) //null
            let record = records.filter((r) => r.id == id)
            console.log(record)
            
            setR(record[0])  
        }   
        getRecordAndArtist()
    },[id])

       if(r.id !== 'placeholder'){
        return(
            <>
            <div className='detail-record-grid-container'>
            <h1 className='detail-record-grid-item-artist'>{r.artist}</h1>
            <h2 className='detail-record-grid-item-title'>{r.title}</h2>
            <img className='detail-record-grid-item-image' src={r.image_src}></img>
            <p className='detail-record-grid-item-description'>{r.descr} <button onClick={() => setShowEdit(!showEdit)}>Edit</button></p>
            {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.descr} genre={r.genre} id={r.id}/>}
            </div> 
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-header'>More from this artist:</h1> }    
            <RelatedRecords collection={allFromArtist.filter((record) => record.id != id)}/> 
            <h1 className='detail-record-grid-related-header2'>You may also like:</h1>
            {allFromGenre.length < 2?  <RelatedRecords className='detail-record-grid-related-records2' collection={records.slice(0,4)}/> : <RelatedRecords className='detail-record-grid-related-records2' collection={allFromGenre.filter((record) => record.artist != r.artist)}/> }
            </>     
        )
       } else {
        return(
            <p>Loading..</p>
        )
       }      

    }
export default Detailrecord