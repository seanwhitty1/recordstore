
import { useParams } from 'react-router-dom';
import './App.css'
import React, { useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

function Magazine(){
    const dispatch = useDispatch()
    const addToCart = (item) => {
        dispatch({type:"ADDTOCART", payload:item, quantity:1})
    }
   

    useEffect(() => {
       // $(window).scrollTop(0);
    },[])

      
        return(
            <>  
            <h1>Here will be the magazine</h1>    

            </>     
        )
         
    }
    
export default Magazine;