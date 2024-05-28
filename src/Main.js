import './Recordgrid.css'
import Home from "./Home";
import './Main.css'
import About from "./About";
import Contact from "./Contact";
import './index.css'
import { Route, Routes } from 'react-router-dom';
import Detailrecord from "./Detailrecord";
import NewRecordForm from "./forms/newRecordForm";
import BrowseAll from "./BrowseAll2";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createURL } from './helpers';
const commonRecordPath = new RegExp("^/records/view")

const Main = () => {
    const dispatch = useDispatch();
    const upRecordsInState = (records) => dispatch({ type: "GETALLRECORDS",payload: records});
    const records = useSelector(state => state.records)
    const genre = useSelector(state => state.genre)
    const cart = useSelector(state => state.cart)
    
    useEffect(() => {
      const getRecords = async() => {
          try {
            let records = await axios.get(createURL(genre))
            upRecordsInState(records.data)  
          } catch(error) {
            console.log("There was an error fetching records", error)
          } 
      }
      getRecords()
  },[genre, cart])

  if(records != null){
return(
    <>
    <div className="main grid-item4">  
    <Routes>
    <Route path='/:genre' element={ <Home/>} />
    <Route path='/' element={ <Home/>} />
    <Route path='/browseall' element={ <BrowseAll/>} />
    <Route path ='/about' element={<About/>}/>
    <Route path ='/contactus' element={<Contact/>}/>
    <Route path ='/records/view/:id' element={<Detailrecord/>}/>
    <Route path ='/addnew' element={<NewRecordForm/>}/>
    </Routes>
      </div>
    </>)
} else {
  return(
    <>
    <p>loading...</p>
    </>
  )
}
};
export default Main;
