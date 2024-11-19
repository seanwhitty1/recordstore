import './Record.css'
import { useParams } from 'react-router-dom';
import './App.css'
import './Detailrecord.css'
import $ from "jquery";
import React, { useEffect} from "react";
import RelatedRecords from './RelatedRecords';
import UpdateRecordForm from './forms/updateRecordForm';
import { useSelector, useDispatch} from 'react-redux';
import add from './svg/addtocart.svg'
import { useState } from 'react';

import 'react-flash-message'
import { uniqueSetOfObjects } from './helpers';
import axios from 'axios';

function Detailrecord(){
    const dispatch = useDispatch()
    const addToCart = (item) => {
        dispatch({type:"ADDTOCART", payload:item, quantity:1})
    }
    const [showEdit, setShowEdit] = useState(false)
    const [labelHover, setLabelHover] = useState(false)
    const [imageFocus, setImageFocus] = useState(false)
    const [genreRecords, setGenreRecords] = useState(["one"])
    const [allFromArtist, setAllFromArtist] = useState(["1"])
    const records = useSelector(state => state.records)
    const params = useParams()
    const {id} = params;
    const [r, setR] = useState(records.filter((r) => r.id == id)[0])
    console.log("record is:", r)
    const parsedTracklist = r.tracklist.map(track => JSON.parse(track))
    const parsedImages = r.images.map(image => JSON.parse(image))
    useEffect(() => {
        setR(records.filter((r) => r.id == id)[0])
        const getGenreAndArtist = async() => {
            let allFromGenres = async() => {
                let genreCache = []
                let recordsCache = []
                for(let genre of r.genres){
                    let genreResult = await axios.get(`http://127.0.0.1:3001/genres/getname/${genre.genre_name}`)
                    genreCache.push(genreResult.data)
                    genreCache.map(genre => recordsCache.push(...genre.records))
                }
                return uniqueSetOfObjects(recordsCache)
            }
            let allFromArtist =  await axios.get(`http://127.0.0.1:3001/artists/name/${r.artists[0].artist_name}`)
            setGenreRecords(await allFromGenres())
            setAllFromArtist(allFromArtist.data.records)
        }
        getGenreAndArtist()
        $(window).scrollTop(0);
    },[id])

       if(r.id !== 'placeholder'){
        return(
            <>
         <div className='detail-record-grid-container'>   
              <div className='detail-record-grid-item-title-artist-label'>
            {r.labels[0].thumbnail_url &&
             <img className={`${labelHover == true? 'label-image-hover detail-record-img': 'detail-record-img'}`}  src={r.labels[0].thumbnail_url} onMouseOver={() => setLabelHover(true)} onMouseOut={() => setLabelHover(false)}></img> 
            }
              <div id="title-artist">
                <h3 className='inline-header'>{r.title}</h3><br></br>
                <h3 className='inline-header'>{r.artists[0].artist_name}</h3>
                <p>{r.format}</p>
                <br></br>    
               </div>
            </div>
            <div className='detail-record-grid-item-description'>
               <p className='preserveLineBreaks'>{r.description}</p>
               <div className='genresListDiv'>
                  <ul className='genresList' > 
                  {r.genres.map(genre => <li className='inlineList'><button type="button" class="btn btn-light">{genre.genre_name}</button></li>)}</ul>
               </div>
               <button className='detail-record-buttonToCart bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' id="addToCart" onClick={() => addToCart(r.id)}><img src={add}></img></button>
            </div>
            {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.description} genre={r.genre} id={r.id}/>}
           <div className='detail-record-grid-item-image' ><img  onMouseOver={() => setImageFocus(true)} onMouseOut={() => setImageFocus(false)} src={imageFocus && parsedImages.length > 1? parsedImages[1].uri: parsedImages[0].uri }></img>
               <div id="tracklist">
               {parsedTracklist.map(track  => 
               <div className='trackDetail'><b>{track.position}</b><p>{track.title}  {track.duration}</p></div>)}  
               {r.quantity > 0? <p>In stock</p>: <p>Out of stock</p>}   
               </div>
            </div>
        </div>
        <hr></hr>
       
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-artist'>More from {r.artists[0].artist_name}</h1>}
            {allFromArtist.length > 1 &&<RelatedRecords collection={allFromArtist.filter((record) => record.id != r.id)}/>}
            <h1 className='detail-record-grid-related-header2'>If you like {r.artists[0].artist_name}, You may also like:</h1>
            {genreRecords.length > 1 && <RelatedRecords className='detail-record-grid-related-records2' collection={genreRecords.filter((genre) => genre.artists[0].id != r.artists[0].id).slice(0,4)}/>}
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