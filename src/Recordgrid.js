import './Recordgrid.css'
import React from "react";
import Record from './Record'

function Recordgrid({records}){
        return(
            <>
            <div className='recordgrid-container'>
            {records && records.slice(0,8).map     
            (r => <Record className='recordgrid-item' id={r.id} artist={r.artist} title={r.title} price={r.price} descr={r.descr} genre={r.genre} image_src={r.image_src}/>
            ) 
            }
            </div>
           </>
        )
    }

export default Recordgrid;