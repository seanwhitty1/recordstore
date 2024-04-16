import React, { useState } from 'react';
import {useFormik} from 'formik';
import axios from 'axios';

const inputs = ["artist", "title", "genre", "price", "description", "image_src"]
const initalializers =  {
    artist: "",
    title: "",
    genre: "",
    price: 0,
    description: "",
    image_src: ""
}

function NewRecordForm(){
    let [failedValidation, setFailedValidation] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("running hansdlesubmit")
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
        
            //send to route
            console.log("heres our value object compiled with formik", values)
            let record = await axios.post("http://localhost:3001/records/addnew",
            values)
            
        }    
        
    }    
            

    let {errors, touched, values, handleChange, handleBlur} = useFormik({
        initialValues: initalializers,
      //  validationSchema: searchRecipeSchema,
    });

    return(
        <>
        <h1>Here we can add a new record Admin use only</h1>
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
      
        <button type='submit'>Submit!</button>
        </form>
        </>
    )
} 

 export default NewRecordForm;