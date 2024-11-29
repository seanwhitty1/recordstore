import './Record.css'
import { useParams } from 'react-router-dom';
import './App.css'
import './Detailrecord.css'
import styles from "./index.css"
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
            setGenreRecords(await allFromGenres())
            setAllFromArtist(records.filter(rec =>  rec.artists[0].artist_name == r.artists[0].artist_name))
        }
        getGenreAndArtist()
        $(window).scrollTop(0);
    },[id])
       if(r.id !== 'placeholder'){
        return(
         <>
         <div className='detail-record-grid-container'>   
            {r.labels[0].thumbnail_url &&
            <div className='detail-record-label-img-container'>
             <img src={r.labels[0].thumbnail_url} onMouseOver={() => setLabelHover(true)} onMouseOut={() => setLabelHover(false)}></img> 
             </div>
            }
            <div className= 'detail-record-grid-item-image pl-10px' ><img className='pl-10px'  onMouseOver={() => setImageFocus(true)} onMouseOut={() => setImageFocus(false)} src={imageFocus && parsedImages.length > 1? parsedImages[1].uri: parsedImages[0].uri }></img> </div>
              <div className="title-artist">
                <h3 className='text-base'>{r.title}</h3>
                <h3  className='text-base inline'>{r.artists[0].artist_name}</h3>
                <p id="release-format" className='mb-5px'> {r.format}</p>
               </div> 
            <div className='detail-record-grid-item-description'>
               <p className='preserveLineBreaks text-xs'>{r.description}</p>
                  {r.genres.map(genre => <button className="btn btn-light m-10px">{genre.genre_name}</button>)}
               <button className='detail-record-buttonToCart bg-blue hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' id="addToCart" onClick={() => addToCart(r.id)}><img src={add}></img></button>
            </div>
            {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.description} genre={r.genre} id={r.id}/>}
               <div id="tracklist">
               {parsedTracklist.map(track  => 
               <div className='hidden'><b>{track.position}</b><p className='trackDetail'>{track.title} {track.duration}</p></div>)}  
               {r.quantity > 0? <p className='hidden'>In stock</p>: <p>Out of stock</p>}   
               </div>
       
        <hr></hr>
            <div className='related-records-div'>
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-artist'>More from {r.artists[0].artist_name}</h1>}
            {allFromArtist.length > 1 &&<RelatedRecords collection={allFromArtist.filter((record) => record.id != r.id)}/>}
            <h1 className='related-header2 sm:text-sm md:text-base lg:text-lg xl:text-2xl'>If you like {r.artists[0].artist_name}, You may also like:</h1>
            {genreRecords.length > 1 && <RelatedRecords className='detail-record-grid-related-records2' collection={genreRecords.filter((genre) => genre.artists[0].id != r.artists[0].id).slice(0,4)}/>}
            <button  className='rounded-full' onClick={() => setShowEdit(!showEdit)}>Edit</button>
            </div>
            </div>
            </>     
        )
       } else {
        return(
            <p>Loading..</p>
        )
       }      
    }
export default Detailrecord