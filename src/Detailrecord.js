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
import { baseURL } from './helpers';

function Detailrecord(){
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const [showEdit, setShowEdit] = useState(false)
    const [imageFocus, setImageFocus] = useState(false)
    const [genreRecords, setGenreRecords] = useState(["one"])
    const [allFromArtist, setAllFromArtist] = useState(["1"])
    const records = useSelector(state => state.records)
    const params = useParams()
    const {id} = params;
    const [r, setR] = useState(records.filter((r) => r.id == id)[0])
    const {artist, title, genre, price} = r
    console.log(r)
    const clickHandler = (e) => {
        e.preventDefault()
        dispatch({type:"ADDTOCART", payload:{id, artist,title, genre, price, image_src:parsedImages[0].uri}})
        if(user){axios.post(`${baseURL}users/addItemToCart`, {user_id: user.data.id, id:id})}
    }
    const parsedTracklist = r.tracklist.map(track => JSON.parse(track))
    const parsedImages = r.images.map(image => JSON.parse(image))
    useEffect(() => {
        const getGenreAndArtist = async() => {
            let allFromGenres = async() => {
                let recordsCache = []
                for(let genre of r.genres){
                    let genreResult = await axios.get(`http://127.0.0.1:3001/genres/getname/${genre.genre_name}`)
                    genreResult.data.records.map(r => recordsCache.push(r))
                }
                return uniqueSetOfObjects(recordsCache)}
            setGenreRecords(await allFromGenres())
            let recordsFromArtist = await axios.get(`http://127.0.0.1:3001/artists/name/${r.artists[0].artist_name}`)
            recordsFromArtist.data.records.forEach(o => o.artists = r.artists)
            setAllFromArtist(recordsFromArtist.data.records)
        }
        getGenreAndArtist()
        $(window).scrollTop(0);
    },[id])
       if(r.id !== 'placeholder'){
        return(
         <>
         <div className='detail-record-grid-container'>
            <div className= 'col-start-1 col-span-4 md:col-span-6 lg:col-span-12 lg:col-start-2' ><img className='object-fit-fill lg:min-h-590px' id="release-art" onMouseOver={() => setImageFocus(true)} onMouseOut={() => setImageFocus(false)} src={imageFocus && parsedImages.length > 1? parsedImages[1].uri: parsedImages[0].uri }></img> </div>
            <div className="description gap-1 lg:gap-2 col-start-1 col-span-4 lg:col-start-2 lg:col-span-9  
             lg:row-start-11 md:col-span-10 md:row-start-7 p-10px row-start-5 ">
            {r.labels[0].thumbnail_url &&
                <div className='hidden lg:flex-row-reverse lg:inline h-100 col-start-9 col-span-3 row-start-1 overflow-hidden'>
                         <img className='' src={r.labels[0].thumbnail_url}></img></div>}
              <div className="title-artist col-start-1 col-span-6 row-start-1">
                <h3 className='text-1xl'>{r.title}</h3>
                <h3  className='text-xl inline'>{r.artists.map(a => a.artist_name + " / ")}</h3>
                <p id="release-format" className='mb-5px'> {r.format}</p>
                <p className='text-green-600'>In stock</p>
                </div>
                {r.quantity > 0? <div class="d-grid gap-2  col-span-4 lg:col-span-11 row-start-2">
             
                <button className="btn btn-outline-secondary" type="button">Add to Cart</button>
  <button className="btn btn-outline-secondary" type="button">Share</button><br></br>
  </div>:<p>Out of stock</p>}   
<div className='row-gap-6 col-start-1 col-span-4 lg:col-start-1 lg:col-span-11'>
               <p className='preserveLineBreaks text-xs'>{r.description}</p> 
               <div id="tracklist" className='hidden lg:flex border-1 items-center p-40px col-span-5 justify-evenly p-20px'>
                <ul className='columns-4'>
               {parsedTracklist.map(track => 
               <li ><span className='m-20px'><b className='text-xs'>{track.position}</b><p className='trackDetail text-s'> {track.title} {track.duration}</p></span></li>)}  
               </ul>
               </div>
               <br></br>
               <div className='d-flex justify-content-center mb-20px'>
               {r.genres.slice(0,3).map(genre => <button className="btn btn-light ml-10px">{genre.genre_name}</button>)}
               <br></br>
               </div>
            </div>
              </div>
              <div className='row-start-13 col-start-1 col-span-4 lg:col-start-2 lg:col-span-12 '> 
              {showEdit && <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.description} genre={r.genre} id={r.id}/>}
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-artist text-center sm:text-sm md:text-base lg:text-lg xl:text-2xl'>More from {r.artists[0].artist_name}</h1>}<br></br>
            {allFromArtist.length > 1 &&<RelatedRecords collection={allFromArtist.filter((record) => record.id != r.id).slice(0,3)}/>}
            <h1 className='text-center sm:text-sm md:text-base lg:text-lg xl:text-2xl'>If you like {r.artists[0].artist_name}, You may also like:</h1>
            {genreRecords.length > 1 && <RelatedRecords className='detail-record-grid-related-records2' collection={genreRecords.filter((g) => g.artists[0].id != r.artists[0].id).slice(0,3)}/>}
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