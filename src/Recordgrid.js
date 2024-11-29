import './Recordgrid.css'
import React from "react";
import Record from './Record'
import styles from "./index.css"


function Recordgrid({records}){
    console.log("inside record grid", records)
        return(
            <>
            <div className='recordgrid-outer-container'>
            <div className='recordgrid-container xl:col-span-20 col-start-1 col-span-2 md:col-span-6 lg:col-span-10'>
            {records && records.slice(0,8).map     
            (r => <Record className='recordgrid-item' {...r}/> )}
            </div>
            </div>
           </>
        )
    }



export default Recordgrid;