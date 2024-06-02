import React, { useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
    const dispatch = useDispatch()
const updaTokenInState = (token) => dispatch({ type: "UPDATETOKEN", payload: token.data});


    const handleSubmit = async(e) => {
        e.preventDefault()
        if (Object.keys(errors).length > 0){
            alert("please fill out all fields")
            setFailedValidation(true)
        } else {
            setFailedValidation(false)
            console.log("running hansdlesubmit")
            const {username, password} = values
            let storedUser = await axios.get(`http://localhost:3001/users/${username}`)
             
            console.log("when we retrieve our stored user instance:", storedUser)
            bcrypt.compare(password, storedUser.data.passkey, async function(err, res) {

            /**To verify an existing password you don't compute the hash and then compare, 
             * instead you use the compare function with the unhashed user-provided password
             *  together with the hashed password from the database. 
             * The "hashed" password in the database actually is stored
             *  in a format that includes the algorithm parameters and the salt 
             * in addition to the hash, so it as easy and foolproof as possible. */
                if (err){
                  // handle error
                  console.log(err)
                }
                if (res) {
                  // Send JWT
                  console.log("its a match")
                  //the we send a post requist for GET JWT in user ROute. 
                  try {
                    let token = await axios.post("http://localhost:3001/users/gettoken", {username:username, password:password}) 
                    console.log("now we have a signed token", token)
                    localStorage.setItem("token", token.data);
                    updaTokenInState(token)

              
                  } catch(err) {
                    console.log(err)
                  }
                  //then we use the returned token to do something. . . .
              
               
              //    return res.json({ token });
                 
                } else {
                console.log("did not match")
                  // response is OutgoingMessage object that server response http request
                }
              });

          
          
      
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