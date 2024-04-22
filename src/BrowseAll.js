import { useEffect,  useContext, useState } from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import Record from './Record'
import axios from "axios"

const BrowseAll = () => {
    let [recordsInGrid, setRecordsInGrid] = useState([])
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const alphabetize = async(letter) => {
        let records = await axios.get("http://localhost:3001/records/")
        setRecordsInGrid(records.data.filter((record) => record.artist[0] === letter))


    }
   

    useEffect(() => {
        async function getRecords(){
          let records = await axios.get("http://localhost:3001/records/")
          setRecordsInGrid(records.data)
    }
    getRecords()} 
    ,[])

    return(
        <>
        <ul className="alphabet-list">
        {alphabet.map(a =>
            <li className="alphabet-letter"><button onClick={() => {alphabetize(a)}}>{a}</button></li>)}
            </ul>
          {recordsInGrid.map
            
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image={r.image_src}/>)}
          
     
        
          
        </>
    )
}
export default BrowseAll;