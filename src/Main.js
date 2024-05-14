import './Recordgrid.css'
import Home from "./Home";
import './Main.css'
import About from "./pages/About";
import Contact from "./Contact";
import './index.css'
import { Route, Routes } from 'react-router-dom';
import Detailrecord from "./Detailrecord";
import NewRecordForm from "./forms/newRecordForm";
import BrowseAll from "./BrowseAll2";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const commonRecordPath = new RegExp("^/records/view")


const Main = () => {

    const dispatch = useDispatch();
    const {genre} = useParams()
    const upRecordsInState = (records) => dispatch({ type: "GETALLRECORDS",payload: records});
    const records = useSelector(state => state.records)
  
    useEffect(() => {
      const getRecords = async() => {
        console.log("our useEffect in main component should be tracking genre:",genre)
          let routeURL;
          if(genre != null){
              routeURL = `http://127.0.0.1:3001/records/genre/${genre}`
  
          } else {
              routeURL = `http://127.0.0.1:3001/records/`
          }
          let records = await axios.get(routeURL)
          upRecordsInState(records.data)   
      }
      getRecords()
  },[genre])

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
