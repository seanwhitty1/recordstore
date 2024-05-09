import { useEffect,  useContext, useState, useParams } from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import Record from './Record'
import axios from "axios"

//TO do - refactor this into the record grid version.

function BrowseAll(){
    const [count, setCount] = useState([]);
    const [focus, setFocus] = useState(null)
    let [allRecords, setAllRecords] = useState([])
    let [recordsByLetter, setRecordsByLetter] = useState([])
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const alphabetize = async(letter) => {
        console.log("running alphabetize")
        setRecordsByLetter(allRecords.filter((record) => record.artist[0] === letter))
    }

    const setFocusHandler = (id) => {
        console.log("handling our set focus",id)
        setFocus(id)
    }
    useEffect(() => {
        async function getRecords(){
          let records = await axios.get("http://localhost:3001/records/")
          console.log("what are our records?", records)
          setAllRecords(records.data)
    }
    getRecords()} 
    ,[])
        let toRender
        recordsByLetter.length > 0? toRender = recordsByLetter: toRender = allRecords

        return(
            <>
            <div className='recordgrid-container'>
            <ul className="alphabet-list">
            <h1>Browse by Artist</h1>
            {alphabet.map(a =>
            <li className="alphabet-letter"><button onClick={() => {alphabetize(a)}}>{a}</button></li>)}
            </ul>
            {toRender.map     
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} setCount={setCount} focus={focus} setFocusHandler={setFocusHandler}/>
            ) 
            } 
           
            </div>
           </>
        )
    }

 export default BrowseAll;