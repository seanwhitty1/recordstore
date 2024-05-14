import {useState} from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import Record from './Record'
import { useSelector, useDispatch } from 'react-redux';


//TO do - refactor this into the record grid version.

function BrowseAll(){
    const records = useSelector(state => state.records)
    let [recordsByLetter, setRecordsByLetter] = useState([])
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const alphabetize = async(letter) => {
        setRecordsByLetter(records.filter((record) => record.artist[0] === letter))
    }
        let toRender
        recordsByLetter.length > 0? toRender = recordsByLetter: toRender = records

        return(
            <>
            <div className='recordgrid-container'>
            <ul className="alphabet-list">
            <h1>Browse by Artist</h1>
            {alphabet.map(a =>
            <li className="alphabet-letter"><button onClick={() => {alphabetize(a)}}>{a}</button></li>)}
            </ul>
            {toRender.map     
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} />
            ) 
            } 
           
            </div>
           </>
        )
    }

 export default BrowseAll;