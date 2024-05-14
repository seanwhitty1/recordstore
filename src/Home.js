import './Main.css'
import Recordgrid from "./Recordgrid";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Home(){


    console.log("rendering our home component")
    const dispatch = useDispatch();
    const {genre} = useParams()
    const upRecordsInState = (records) => dispatch({ type: "GETALLRECORDS",payload: records});
    const records = useSelector(state => state.records)
    if(genre){records = records.filter((record) => record.genre = genre)}
  
    useEffect(() => {
      const getRecords = async() => {
        console.log("Updating the genres of our param", genre)

   
         
          
      }
      getRecords()
  },[genre])
    return(
        <>
         <h1 className='main-header'>Latest additions</h1>
         <Recordgrid/>
        </>
    )
}

export default Home;