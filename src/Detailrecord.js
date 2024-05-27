import './Record.css'
import { useParams } from 'react-router-dom';
import './App.css'
import './Detailrecord.css'
import React, { useEffect} from "react";
import RelatedRecords from './RelatedRecords';
import UpdateRecordForm from './forms/updateRecordForm';
import { useSelector, useDispatch } from 'react-redux';
import 'react-flash-message'

//https://api.discogs.com/database/search?title=tropisch%20verlangen&key=TOowIbaZcuVVCOslftjB&secret=ZHxMSFhhcAJNmasBMrBsvOXakNIcgGxr

function Detailrecord(){
    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch({type:"ADDTOCART", payload:r, quantity:1})
    }
    const params = useParams()
    const {id} = params;
    const records = useSelector(state => state.records)
    let r = records.filter((r) => r.id == id)[0]

    let allFromArtist =  records.filter((record) => record.artist == r.artist);
    let allFromGenre = records.filter((record) => record.genre == r.genre);
  
    useEffect(() => {
    
    },[])

       if(r.id !== 'placeholder'){
        return(
            <>
            <div className='detail-record-grid-container'>
            <h1 className='detail-record-grid-item-artist'>{r.artist}</h1>
            <h2 className='detail-record-grid-item-title'>{r.title}</h2>
            <img className='detail-record-grid-item-image' src={r.image_src}></img>
            <p className='detail-record-grid-item-description'>{r.descr} <button  className='rounded-full'>Edit</button></p>
            <button className='detail-record-buttonToCart bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' id="addToCart" onClick={() => addToCart(r.id)}>add to cart</button>
            <UpdateRecordForm artist={r.artist} title = {r.title} price={r.price} image_src={r.image_src} descr={r.descr} genre={r.genre} id={r.id}/>
            </div> 
       
            {allFromArtist.length > 1 && <h1 className='detail-record-grid-related-header'>More from this artist:</h1>}  
            <RelatedRecords collection={allFromArtist.filter((record) => record.id != r.id)}/>
            <h1 className='detail-record-grid-related-header2'>You may also like:</h1>
            {allFromGenre.length < 2?  <RelatedRecords className='detail-record-grid-related-records2' collection={records.filter((record) => record.id != id).slice(0,4)}/> : <RelatedRecords className='detail-record-grid-related-records2' collection={allFromGenre.filter((record) => record.artist != r.artist)}/> }
            </>     
        )
       } else {
        return(
            <p>Loading..</p>
        )
       }      

    }
export default Detailrecord