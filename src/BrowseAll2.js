import {useState} from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import './App.css'
import $ from 'jquery';
import Record from './Record'
import { useSelector} from 'react-redux';
import Recordgrid from "./Recordgrid";

function BrowseAll(){
    const recs = useSelector(state => state.records)
    let [recordsByLetter, setRecordsByLetter] = useState(recs)
    let [searchItem, setSearchItem] = useState("")
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const inputs = ["artist","title", "genre", "price"]
    const inputQuery = $('#filterQuery').val()

    const handleInputChange = (e) => { 
        setSearchItem( e.target.value)
        const regex = new  RegExp(`${e.target.value}`)

        if (recs.filter((record) => regex.test(record.title) == true)){
            console.log("found", recs.filter((record) => regex.test(record[inputQuery])))
          setRecordsByLetter(recs.filter((record) => regex.test(record[inputQuery])))
  
        } else {
          console.log("nothing found")
        }
    }

    const alphabetize = async(letter) => {
        setRecordsByLetter(recs.filter((recs) => recs.artists[0].artist_name[0] === letter))
    }
        let toRender
        recordsByLetter.length > 0? toRender = recordsByLetter: toRender = recs
        return(
            <>
            <h1 className="main-header">Browse by Artist</h1>
            <ul className="alphabet-list">
            {alphabet.map(a =>
            <li className="alphabet-letter lg:color-blue;"><button onClick={() => {alphabetize(a)}}>{a}</button></li>)}
            </ul>
<div className="searchBar">     
<select id="filterQuery" name="filterQuery" className="margin-right-10">
  {inputs.map(input => <option value={input}>{input}</option>)}
</select>
          <input
          className="input-select"
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Search'
        />
        {searchItem && <h1 className="margin-left-15 margin-top-10 text-offBlack">Searching {inputQuery}s for: {searchItem}</h1>}
      </div>
            <div className="recordgrid-container">
           
            {recordsByLetter.length > 0? <Recordgrid records={recordsByLetter}/>
                                        : <h1 className="no-results">No results found</h1>

            } 
            </div>
           </>
        )
    }

 export default BrowseAll;