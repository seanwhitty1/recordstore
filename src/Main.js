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
import Magazine from './Magazine.js';
import BrowseAll from "./BrowseAll2";
import Artwork from './Artwork.js';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import { baseURL } from './helpers.js';
import styles from "./index.css"

const Main = () => {
  const {user } = useAuth()
    const dispatch = useDispatch();
    const upRecordsInState = (records) => dispatch({ type: "GETALLRECORDS",payload: records});
    const records = useSelector(state => state.records)
    const genre = useSelector(state => state.genre)
    const getRecords = async(g) => {
      try {
        let records = await axios.get(`${baseURL}records/`)
        if(g){
         upRecordsInState(records.data.filter(record  => record.genres.some(gen => gen.genre_name == g)))
        } else {
          upRecordsInState(records.data)
        }
      } catch(error) {
        console.log(error)
      } 
  }

    const getUserCart = async (id) => {
      let cart = await axios.get(`${baseURL}users/getUserCart/${id}`)
    dispatch({type: "INITUSERCART", payload: cart.data})}

    useEffect(() => {
      const updateUser = (user) => {
        dispatch({type: "UPDATEUSER", payload: user})
      }
      if(user){
        updateUser(user)
        getUserCart(user.data.id)  
      }
      getRecords(genre)
  },[user, genre])
  if(records){
return(
    <>

    {user && <h1>hello {user.data.username}</h1>}
    <Routes>
    <Route path='/' element={ <Home/>} />
    <Route path='/:genre' element={ <Home/>} />
    <Route path='/browseall' element={ <BrowseAll/>} />
    <Route path ='/about' element={<About/>}/>
    <Route path ='/contactus' element={<Contact/>}/>
    <Route path ='/magazine' element={<Magazine/>}/>
    <Route path ='/artwork' element={<Artwork/>}/>
    <Route path ='/records/view/:id' element={<Detailrecord/>}/>
    <Route path ='/addnew' element={<NewRecordForm/>}/>
    <Route path ='/userdashboard' element={<UserDashboard/>}/>
    <Route path= '/fullcart' element={<CartDetail/>}/>
    </Routes>
 
    <hr></hr>

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