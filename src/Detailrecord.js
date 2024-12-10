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
    const [imageFocus, setImageFocus] = useState(false)
    const [genreRecords, setGenreRecords] = useState(["one"])
    const [allFromArtist, setAllFromArtist] = useState(["1"])
    const records = useSelector(state => state.records)
    const params = useParams()
    const {id} = params;
    const [r, setR] = useState(records.filter((r) => r.id == id)[0])
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
         <div className='detail-record-grid-container p-10px'>   
            {r.labels[0].thumbnail_url &&
            <div className='detail-record-label-img-container col-start-4 col-span-1 lg:col-start-8 lg:col-span-3 row-start-6 lg:row-start-3'>
             <img src={r.labels[0].thumbnail_url}></img> 
             </div>
            }
            <div className= 'detail-record-grid-item-image pl-10px  col-start-1 col-span-4 md:col-span-6 lg:col-span-6' ><img className='pl-10px'  onMouseOver={() => setImageFocus(true)} onMouseOut={() => setImageFocus(false)} src={imageFocus && parsedImages.length > 1? parsedImages[1].uri: parsedImages[0].uri }></img> </div>
   
            <div className="description-flexible col-start-1 col-span-4 lg:col-start-1 lg:col-span-10 md:col-span-10 md:row-start-7 p-10px row-start-5 lg:mt-20px lg:row-start-7 lg:mt-20px">
            <br></br>
              <div className="title-artist">
                <h3 className='text-base'>{r.title}</h3>
                <h3  className='text-base inline'>{r.artists[0].artist_name}</h3>
                <p id="release-format" className='mb-5px'> {r.format}</p>
               </div> 
               {r.quantity > 0? <p className='text-green-600'>In stock<button className='h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800' id="addToCart" onClick={() => addToCart(r.id)}>+</button></p>:<p>Out of stock</p>}  
            <div className='detail-record-grid-item-description'>
               <p className='preserveLineBreaks text-xs'>{r.description}</p> 
            <div id="tracklist" className='hidden lg:flex border-1 items-center p-20px col-span-3'>
                <ul className='columns-3 items-center'>
               {parsedTracklist.map(track => 
               <li><b className='text-xs'>{track.position}</b><p className='trackDetail text-xs'>{track.title} {track.duration}</p></li>)}  
               </ul>
               </div>
               {r.genres.map(genre => <button className="btn btn-light m-10px">{genre.genre_name}</button>)}
            </div>
            {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.description} genre={r.genre} id={r.id}/>}
        <hr></hr>
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-artist sm:text-sm md:text-base lg:text-lg xl:text-2xl'>More from {r.artists[0].artist_name}</h1>}<br></br>
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