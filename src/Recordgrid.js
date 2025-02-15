import './Recordgrid.css'
import React from "react";
import Record from './Record'
import styles from "./index.css"

function Recordgrid({records}){
        return(
            <>
            <div className='recordgrid-outer-container'>
            <div className='recordgrid-container xl:col-span-24 col-start-1 col-span-2 md:col-start-1 md:col-span-8 lg:col-span-8'>
            {records && records.slice(0,8).map     
            (r => <Record {...r}/> )}
            </div>
            </div>
           </>
        )
    }



export default Recordgrid;