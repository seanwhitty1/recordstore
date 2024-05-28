import {useState} from "react"
import './Recordgrid.css'
import './BrowseAll.css'
import './App.css'
import Record from './Record'
import { useSelector} from 'react-redux';


function BrowseAll(){
    const records = useSelector(state => state.records)
    let [recordsByLetter, setRecordsByLetter] = useState([])
    let [searchItem, setSearchItem] = useState("")
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
        console.log("updating", searchItem)
        
        const regex = new  RegExp(`${searchTerm}`,'g')
        console.log("whatis our regex", regex)
        console.log(regex.test("m"))
        if (records.filter((record) => regex.test(record.title) == true)){
          setRecordsByLetter(records.filter((record) => regex.test(record.title)))
  
        } else {
          console.log("nothing found")
        }
    }

    const alphabetize = async(letter) => {
        setRecordsByLetter(records.filter((record) => record.artist[0] === letter))
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
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Search Filters
</button>
<div>      
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Search by Title'
        />
      </div>
        

            <div className="recordgrid-container">
            {recordsByLetter.length > 0? toRender.map     
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image_src={r.image_src} />
            ): <h1 className="no-results">No results found</h1>
            } 
            </div>
           
           </>
        )
    }

 export default BrowseAll;