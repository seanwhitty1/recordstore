import './Recordgrid.css'
import React from "react";
import Record from './Record'

function Recordgrid({records}){
    console.log("inside record grid", records)
        return(
            <>
            <div className='recordgrid-container'>
            {records && records.slice(0,8).map     
            (r => <Record className='recordgrid-item' {...r}/> )}
            </div>
           </>
        )
    }

export default Recordgrid;