
import { useState } from 'react';
import FeaturegridItem from "./FeaturegridItem";
import React, { useEffect} from "react";
import axios from 'axios';
import './Featuregrid.css'

function Featuregrid({records}){
    const [features, setFeatures] = useState([1,2,4]);

    useEffect(() => {
        let getFeatures = async() => {
            let features = await axios.get(`http://127.0.0.1:3001/features/`)        
            setFeatures(features.data.slice(0,3))
        }
        getFeatures()
    },[])
        return(
            <>
            <div className='featuregrid-container'>
            {features.map(f => <FeaturegridItem title={f.title}/>)}
            </div>
           </>
        )
    }

export default Featuregrid;