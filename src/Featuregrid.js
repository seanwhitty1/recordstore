
import { useState } from 'react';
import FeaturegridItem from "./FeaturegridItem";
import React, { useEffect} from "react";
import axios from 'axios';

function Featuregrid({records}){
    const [features, setFeatures] = useState([1,2,4]);

    useEffect(() => {
        //this will ge the top 3 most recent features and display them as items 
        let getFeatures = async() => {
            let features = await axios.get(`http://127.0.0.1:3001/features/`)  
            
              //  setFeatures(features.slice(0,3));
        }
        getFeatures()
    },[])
        return(
            <>
            <div className='featuregrid-container'>
            {features.map(f => <featuregridItem/>)}
            </div>
           </>
        )
    }

export default Featuregrid;