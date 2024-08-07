import './Record.css'
import { useParams } from 'react-router-dom';
import './App.css'
import './Detailrecord.css'
import React, { useEffect} from "react";
import RelatedRecords from './RelatedRecords';
import UpdateRecordForm from './forms/updateRecordForm';
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import 'react-flash-message'
import axios from 'axios';

function Detailrecord(){
    const dispatch = useDispatch()
    const addToCart = (item) => {
        dispatch({type:"ADDTOCART", payload:item, quantity:1})
    }

    const [showEdit, setShowEdit] = useState(false)
    const [genreRecords, setGenreRecords] = useState(["one"])
    const [allFromArtist, setAllFromArtist] = useState(["1"])
    const records = useSelector(state => state.records)
    const params = useParams()
    const {id} = params;
    const [r, setR] = useState(records.filter((r) => r.id == id)[0])
    const parsedTracklist = r.tracklist.map(track => JSON.parse(track))
    const parsedImages = r.images.map(image => JSON.parse(image))
    console.log("parsed images:", parsedImages)
    
    useEffect(() => {
        const getGenreAndArtist = async() => {
            let allFromGenre =  await axios.get(`http://127.0.0.1:3001/genres/getname/${r.genres[0].genre_name}`)
            let allFromArtist =  await axios.get(`http://127.0.0.1:3001/artists/name/${r.artists[0].artist_name}`)
            setGenreRecords(allFromGenre.data.records)
            setAllFromArtist(allFromArtist.data.records)
        }
        getGenreAndArtist()
    },[])

       if(r.id !== 'placeholder'){
        return(
            <>
            <div className='detail-record-grid-container'>
            <h1 className='detail-record-grid-item-title'>{r.artists[0].artist_name} - {r.title}</h1>
            <p className='detail-record-grid-item-description'>{r.description}</p>
            {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.description} genre={r.genre} id={r.id}/>}
            <img className='detail-record-grid-item-image' src={parsedImages[0].uri}></img>
            <button className='detail-record-buttonToCart bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' id="addToCart" onClick={() => addToCart(r.id)}>add to cart</button>
            <div className='detail-record-tracklist'>
            
            <div id="tracklist">
            <h1>Tracklist</h1>
            {parsedTracklist && parsedTracklist.map(track  => 
            <div className='trackDetail'><b>{track.position}</b><p>{track.title}  {track.duration}</p></div>)}
            </div>
            </div>
           </div>
           <hr></hr>
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-header'>More from this artist:</h1>}  
            <RelatedRecords collection={allFromArtist.filter((record) => record.id != r.id)}/>
            <h1 className='detail-record-grid-related-header2'>You may also like:</h1>
            {genreRecords.length > 1 && <RelatedRecords className='detail-record-grid-related-records2' collection={genreRecords.filter((record) => record.artists[0].id != r.artists[0].id).slice(0,4)}/>}
            <button  className='rounded-full' onClick={() => setShowEdit(!showEdit)}>Edit</button>
            </>     

        )
       } else {
        return(
            <p>Loading..</p>
        )
       }      

    }
export default Detailrecord