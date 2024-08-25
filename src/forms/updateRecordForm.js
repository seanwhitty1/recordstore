import React, { useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function UpdateRecordForm(props){
    let description = "description"
const dispatch = useDispatch()
const navigate = useNavigate()
const {artist, title, genre, price, descr, image_src, id} = props
const upRecordsInState = (records) => dispatch({ type: "GETALLRECORDS",payload: records});

const createRecordGetURL = (genre) => 
    genre? `http://127.0.0.1:3001/records/genre/${genre}`: `http://127.0.0.1:3001/records/`
//both arrays


const deleteHandler = async(id) => {
    await axios.delete(`http://localhost:3001/records/${id}`)
    let records = await axios.get(createRecordGetURL()) //should return array of record instances
    console.log(records)
    upRecordsInState(records.data)  
    navigate("/")
}
console.log("inside our updated record form what are our props", artist)

const inputs = ["artist", "title", "genre", "price", "image_src"]
const initalializers =  {
    artist: artist,
    title: title,
    genre: genre,
    price: price,
    description: descr,
    image_src: image_src,

}


    let [failedValidation, setFailedValidation] = useState(false)
  

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("running hansdlesubmit")
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
            let record = await axios.put(`http://localhost:3001/records/update/${id}`,
            values)
            console.log("lets now navigate to home /")
            navigate("/")
            
        }    
    }    
        
    let {errors, touched, values, handleChange, handleBlur} = useFormik({
        initialValues: initalializers,
    });
    console.log("initial values", values)

    return(
        <>n
        <form autoComplete='off' onSubmit={handleSubmit}>
        {inputs.map(word => 
        <div className='form-group'>
            <label htmlFor={word}>{word}
            <input type="text" 
             id={word} 
             value={values.word}
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder={values[word]}
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
         
      
        <button type='submit'>Submit!</button>
        </form>
        <button onClick={() => deleteHandler(id)}>Delete</button>
        </>
    )
} 

 export default UpdateRecordForm;