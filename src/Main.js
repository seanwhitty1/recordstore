import './Recordgrid.css'
import Home from "./Home";
import './Main.css'
import About from "./About";
import Contact from "./Contact";
import './index.css'
import { Route, Routes } from 'react-router-dom';
import Detailrecord from "./Detailrecord";
import CartDetail from './CartDetail.js';
import NewRecordForm from "./forms/newRecordForm";
import BrowseAll from "./BrowseAll2";
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import UserDashboard from './UserDashboard';

const createRecordGetURL = (genre) => 
  genre? `http://127.0.0.1:3001/records/genre/${genre}`: `http://127.0.0.1:3001/records/`

const Main = () => {
  const {token, user } = useAuth()
  console.log("inside our main app", user)
    const dispatch = useDispatch();
    const upRecordsInState = (records) => dispatch({ type: "GETALLRECORDS",payload: records});
    const records = useSelector(state => state.records)
    const genre = useSelector(state => state.genre)
    const cart = useSelector(state => state.cart)
    useEffect(() => {
      const updateUser = (user) => {
        dispatch({type: "UPDATEUSER", payload: user})
      }
      const getRecords = async() => {
          try {
            let records = await axios.get(createRecordGetURL(genre))
            upRecordsInState(records.data)  
          } catch(error) {
          } 
      }
      if(user){
        updateUser(user)
      }
      getRecords()
  },[genre, cart, user])
  if(records != null){
    //  {user && <h1>Welcome {user.username}</h1>}
return(
    <>
  
    <Routes>

    <Route path='/' element={ <Home/>} />
    <Route path='/:genre' element={ <Home/>} />

    <Route path='/browseall' element={ <BrowseAll/>} />
    <Route path ='/about' element={<About/>}/>
    <Route path ='/contactus' element={<Contact/>}/>
    <Route path ='/records/view/:id' element={<Detailrecord/>}/>
    <Route path ='/addnew' element={<NewRecordForm/>}/>
    <Route path ='/userdashboard' element={<UserDashboard/>}/>
    <Route path= '/fullcart' element={<CartDetail/>}/>
    </Routes>
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
