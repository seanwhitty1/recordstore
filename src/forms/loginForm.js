import React, { useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const bcrypt = require('bcryptjs');

const inputs = ["username", "password"]
const initalializers =  {
    username: "",
    password: "",

}

function LoginForm(){
    let [failedValidation, setFailedValidation] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("running hansdlesubmit") //need to destructur
        const username = values.username;
      
       
        let storedUser = await axios.get(`http://localhost:3001/users/${username}`)
        console.log("stored user is", storedUser.data)
        const hashedPW = await bcrypt.hash(values.password, storedUser.data.salt)
        console.log(hashedPW, storedUser.data.passkey)
    

       
            if (hashedPW == storedUser.data.passkey) {
             // 
             console.log("matched!")
            } else {
             // Passwords don't match
             console.log("did not match")
            }
          ;
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
      
        }    
    }         
    let {errors, touched, values, handleChange, handleBlur} = useFormik({
        initialValues: initalializers,
    });

    return(
        <>
        <h1 className='main-header'>Please login</h1>
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
            <button type="submit" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Login!
</button>
        

        </form>



        </>
    )
} 

 export default LoginForm;