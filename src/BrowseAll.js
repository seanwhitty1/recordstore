import { useEffect,  useContext, useState } from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import Record from './Record'
import axios from "axios"

const BrowseAll = () => {
    let [recordsByLetter, setRecordsByLetter] = useState([])
    let [allRecords, setAllRecords] = useState([])
    const [focus, setFocus] = useState(null)
    const setFocusHandler = (id) => {
        console.log("handling our set focus",id)
        setFocus(id)

    }
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const alphabetize = async(letter) => {
        setRecordsByLetter(allRecords.filter((record) => record.artist[0] === letter))
    }
    useEffect(() => {
        async function getRecords(){
          let records = await axios.get("http://localhost:3001/records/")
          setRecordsByLetter(records.data)
          setAllRecords(records.data)
    }
    getRecords()} 
    ,[])

    //to do, replace this with record grid
    return(
        <>
        <ul className="alphabet-list">
        {alphabet.map(a =>
            <li className="alphabet-letter"><button onClick={() => {alphabetize(a)}}>{a}</button></li>)}
            </ul>
          {recordsByLetter.map   
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src} setFocusHandler={setFocusHandler}/>)}
        </>
    )
}
export default BrowseAll;