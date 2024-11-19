import React, { useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const inputs = ["title", "text"]

const initalializers =  {
    title: "",
    text: "",
 
}

function NewFeatureForm(){
    let [failedValidation, setFailedValidation] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
            await axios.post("http://localhost:3001/features/",
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
            {word == "title"?<input type="text"
             id={word} 
             value={values.word}
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder={word}
             className={errors.word? 'input-error form-control': "form-control"}
            ></input>:
            <textarea type="textarea" 
             id={word} 
             value={values.text}
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder={"enter your text here"}
             className={errors.description? 'input-error form-control': "form-control"}
            ></textarea>}
            {failedValidation? <p className='text-danger'>{errors[word]}</p>: null}   
            {touched[word] && errors[word] && (<p className='invalid-feedback'>{errors[word]}</p>)}
            </label>
            </div>  
            )} 
        <button type="submit" class="btn btn-primary">Submit!</button>

        </form>
        </>
    )
} 

 export default NewFeatureForm;