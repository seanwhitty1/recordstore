import React from "react";

function FeaturegridItem(f){
        return(
            <>
            <div className='featuregriditem-container'>
            <img src={f.coverImage}></img>
            <p>{f.title}</p>
            <p>{f.creationDate}</p>
           
        
            </div>
           </>
        )
    }

export default FeaturegridItem;