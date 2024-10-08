import React, { useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../App.css'

const inputs = ["artist_name", "title", "genres", "price", "tags"]
let description = "description"
const initalializers =  {
    artist_name: "",
    title: "",
    genres: "",
    price: 0,
    description: "",
    tags: "",

}

function NewRecordForm(){
    let [failedValidation, setFailedValidation] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
            console.log(values)
            await axios.post("http://localhost:3001/records/",
            values)
            navigate("/")
        }    
    }         
    let {errors, touched, values, handleChange, handleBlur} = useFormik({
        initialValues: initalializers,
    });

    return(
        <>
        <h1 className='main-header'>Here we can add a new record Admin use only</h1>
        <form autoComplete='off' onSubmit={handleSubmit}>
        {inputs.map(word => 
        <div className='form-group'>
            <label htmlFor={word}>{word}
            <input type="text" 
             id={word} 
             value={values.word}
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder={word}
             className={errors.word? 'input-error form-control': "form-control"}
            ></input>
            {failedValidation? <p className='text-danger'>{errors[word]}</p>: null}   
            {touched[word] && errors[word] && (<p className='invalid-feedback'>{errors[word]}</p>)}
            </label>
            </div>  
            )} 
            <div className='form-group'>
            <label htmlFor={description}>description
            <textarea type="textarea" 
             id={description} 
             value={values.description}
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder={description}
             className={errors.description? 'input-error form-control': "form-control"}
            ></textarea>
            {failedValidation? <p className='text-danger'>{errors[description]}</p>: null}   
            {touched[description] && errors[description] && (<p className='invalid-feedback'>{errors[description]}</p>)}
            </label>
            </div>  
         
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'>Submit!</button>
        </form>
        </>
    )
} 

 export default NewRecordForm;