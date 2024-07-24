import React, { useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../AuthProvider'


import '../App.css'
const bcrypt = require('bcryptjs');

const inputs = ["username", "password"]
const validateToken = async(token) => {
    let user = await axios.get(`http://127.0.0.1:3001/users/auth/token/${token}`)
    const {username} = user.data
    return {username, token} 
  }

const initalializers =  {
    username: "",
    password: "",

}
function LoginForm(){
  const { setToken, token, setUser } = useAuth();
    let [failedValidation, setFailedValidation] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
            const {username, password} = values;
        
            let validPassword = await axios.post(`http://localhost:3001/users/login/validate`, {username, password})
            //console.log("validation method", await storedUser.validatePassword(password, storedUser.data.password)) //is not a function//undefined
            console.log("what is returned from our validation route", validPassword)
  
                
                if (validPassword) {
                  // Send JWT
                  //the we send a post requist for GET JWT in user ROute. 
                  try {
                    console.log("comparing did not return error, and res was true", validPassword.data) // functioning
                  //  let token = await storedUser.writeJWT(username, storedUser.data.isAdmin )
                   
             
                    setToken(validPassword.data)
                    localStorage.setItem("token", validPassword.data)
                    //setUser(user.data)
                    navigate("/")
                  } catch(err) {
                    console.log(err)
                  }
                } else {
                console.log("did not match")
                }
              };
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