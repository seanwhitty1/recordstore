import React from "react";
import './Featuregrid.css'

function FeaturegridItem(f){
        return(
            <>
            <div className='featuregriditem-container'>
            <p>this is a feature grid item</p>
            <p>{f.title}</p>
            </div>
           </>
        )
    }
export default FeaturegridItem;