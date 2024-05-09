import './Record.css'
import { useParams } from 'react-router-dom';
import './App.css'
import './Detailrecord.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import RelatedRecords from './RelatedRecords';
import UpdateRecordForm from './forms/updateRecordForm';
import 'react-flash-message'

function Detailrecord(){
    const [r, setR] = useState({id:"placeholder"});
    const [allFromArtist, setAllFromArtist] = useState([])
    const [allFromGenre, setAllFromGenre] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const params = useParams()
    const {id} = params

 

    useEffect(() => {
        const getRecordAndArtist = async() => {
            console.log("running get record and artist")
            let record = await axios.get(`http://127.0.0.1:3001/records/view/${id}`)
            let allFromArtist = await axios.get(`http://127.0.0.1:3001/artists/${record.data.artist}`)
            let allFromGenre = await axios.get(`http://127.0.0.1:3001/genres/view/${record.data.genre}`)
            setAllFromArtist(allFromArtist.data.filter((release) => release.record_id != record.data.id))
            setR(record.data)
            setAllFromGenre(allFromGenre.data.filter((release) => release.artist != record.data.artist))   
        }
        
        getRecordAndArtist()
    },[id])
       if(r.id != 'placeholder'){
        console.log("record is loaded, what are our other records from the artist", allFromArtist) //returns an array with objects 
        return(
            <>
            <div className='detail-record-grid-container'>
            <h1 className='detail-record-grid-item-artist'>{r.artist}</h1>
            <h2 className='detail-record-grid-item-title'>{r.title}</h2>
            <img className='detail-record-grid-item-image' src={r.image_src}></img>
            <p className='detail-record-grid-item-description'>{r.descr} <button onClick={() => setShowEdit(!showEdit)}>Edit</button></p>
            {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.descr} genre={r.genre} id={r.id}/>}
            </div>
           
            {allFromArtist.length > 0 &&  <h1 className='detail-record-grid-related-header'>More from this artist:</h1> }    
            <RelatedRecords collection={allFromArtist}/> 
           
            <h1 className='detail-record-grid-related-header2'>You may also like:</h1>
            <RelatedRecords className='detail-record-grid-related-records2' collection={allFromGenre}/>
            </>     
        )
       } else {
        return(
            <p>Loading..</p>
        )
       }      
        
    }
export default Detailrecord