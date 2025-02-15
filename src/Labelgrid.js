import './Recordgrid.css'
import React from "react";
import Label from './Label'
import Record from './Record'
import styles from "./index.css"

function Labelgrid({labels}){
        return(
            <>
            <div className='recordgrid-outer-container'>
            <div className='recordgrid-container col-start-1 col-span-2 md:col-start-1 md:col-span-8 lg:col-span-8'>
            {labels && labels.slice(0,8).map     
            (l => <Label id={l.id} thumbnail_url={l.thumbnail_url} /> )}
            </div>
            </div>
           </>
        )
    }



export default Labelgrid;