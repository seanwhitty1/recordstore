import {useState} from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import './App.css'
import $ from 'jquery';
import Record from './Record'
import { useSelector} from 'react-redux';

function BrowseAll(){
    const records = useSelector(state => state.records)
    let [recordsByLetter, setRecordsByLetter] = useState(records)
    let [searchItem, setSearchItem] = useState("")
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const inputs = ["artist","title", "genre", "price"]
    const inputQuery = $('#filterQuery').val()

    const handleInputChange = (e) => { 
        setSearchItem( e.target.value)
        const regex = new  RegExp(`${e.target.value}`)

        if (records.filter((record) => regex.test(record.title) == true)){
            console.log("found", records.filter((record) => regex.test(record[inputQuery])))
          setRecordsByLetter(records.filter((record) => regex.test(record[inputQuery])))
  
        } else {
          console.log("nothing found")
        }
    }

    const alphabetize = async(letter) => {
        setRecordsByLetter(records.filter((record) => record.artists[0].artist_name[0] === letter))
    }
        let toRender
        recordsByLetter.length > 0? toRender = recordsByLetter: toRender = records
        return(
            <>
            <h1 className="main-header">Browse by Artist</h1>
            <ul className="alphabet-list">
            {alphabet.map(a =>
            <li className="alphabet-letter"><button onClick={() => {alphabetize(a)}}>{a}</button></li>)}
            </ul>
<div className="searchBar">     
<select id="filterQuery" name="filterQuery" className="margin-right-10">
  {inputs.map(input => <option value={input}>{input}</option>)}
</select>
          <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Search by Title'
        />
        {searchItem && <h1 className="margin-left-15 margin-top-10 text-offBlack">Searching {inputQuery}s for: {searchItem}</h1>}
      </div>
            <div className="recordgrid-container">
            {recordsByLetter.length > 0? toRender.map     
            (r => <Record className='recordgrid-item' {...r} />
            ): <h1 className="no-results">No results found</h1>
            } 
            </div>
           </>
        )
    }

 export default BrowseAll;