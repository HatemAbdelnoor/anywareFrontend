import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUserAsync, selectUserData } from '../../redux/userLoginSlice';
import { Navigate } from "react-router-dom";

export default function Login({saveUserData}) {

  const dispatch = useDispatch();




  
  let apiDate=""
 const [isloading,setisloading]= useState(false);


/*
     !!!!!!!!!!!!!!!!!!!!!!!!!  fetching  data without redux!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
async   function handleLogin(values){
    let data=  await axios.post(`http://localhost:5000/auth/login`,values).then(response => {
      console.log(response);
       apiDate=response


})
    if (apiDate.data.message=="Done"){


      localStorage.setItem("userToken", apiDate.data.access_token);
      setisloading(false);
      navigate('/Home');
  
      saveUserData();


    }else{
      toast.error(`${apiDate.data.message}`)

    }
   

  }
  */


  let validationSchema=Yup.object({
    email:Yup.string().required("Email is required").email("email is invalid"),
    password:Yup.string().required("Password is required").matches(/[a-zA-Z0-9]{5,10}/),
  })
  
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit:(values, { resetForm }) => {
      dispatch(LoginUserAsync(values));
      resetForm();}
    

    
    
  });
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};
   
  return <>
   <Helmet>
    <title>Login </title>
   </Helmet>
{ localStorage.getItem ("userToken")== null?
  <form  onSubmit={formik.handleSubmit}>

    <div className='w-75 mx-auto py-4' >
      <label htmlFor='email' >email</label>
      <input type='text'  onBlur={formik.handleBlur} className='form-control' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
      <label htmlFor='password' >password</label>
      <input type='password'  onBlur={formik.handleBlur} className='form-control' id='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
      
      
             <button disabled={! (formik.isValid && formik.dirty && !isloading)}  type='submit' className='btn btn-primary'>
          
      {!isloading ? "Login":<i className=' fas fa-spinner fa-spin ' ></i>}
      </button>
        <br />
            <br />

      </div>

      <div>
        
        </div>
      </form>: <Navigate to={"/Home"}/>}

  </>
}
