import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Navigate} from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync, selectUserData } from '../../redux/userRegisterSlice';

export default function Register() {
  const dispatch = useDispatch();



 const [isloading,setisloading]= useState(false);


/*
     !!!!!!!!!!!!!!!!!!!!!!!!!  fetching  data without redux!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 let apiDate="" ;

async   function handleRegister(values){
    let data=  await axios.post(`http://localhost:5000/auth/signup
    `,values).then(response => {
      console.log(response);
       apiDate=response


    })

    if (apiDate.data.message=="Done"){
      setisloading(false);
      toast.success(`Now you can login`)

      navigate('/login')
      console.log("m=d=dsa");
    }else{
      toast.error(`${apiDate.data.message}`)

    }
   
    console.log("Register");
    console.log(values);
  }
  */
  let validationSchema=Yup.object({
    userName:Yup.string().required("userName is required").min(3,"userName minlength is 3").max(24,"userName maxlength is 24"),
    email:Yup.string().required("Email is required").email("email is invalid"),
    password:Yup.string().required("Password is required").matches(/[a-zA-Z0-9]{5,24}/,"password must between 5 and 24 characters"),
    phone:Yup.string().required("Phone is required" ).matches(/^01[0125][0-9]{8}$/,"phone must be Egyptian phone valid")
  })
  
  let formik = useFormik({
    initialValues: {
      userName: '',
      phone:'',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit:(values, { resetForm }) => {
      dispatch(registerUserAsync(values));
      resetForm();}
    
  });
   
  return <>

{ localStorage.getItem ("userToken")== null?
 <form  onSubmit={formik.handleSubmit}>

    <div className='w-75 mx-auto py-4' >
      <h3> Register Now :</h3>
      <label htmlFor='userName' >userName</label>
      <input type='text' onBlur={formik.handleBlur} className='form-control' id='userName' name='userName' placeholder='' onChange={formik.handleChange} value={formik.values.userName} />
      {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name} </div>:null }
      <label htmlFor='phone' >phone</label>
      <input type='text'  onBlur={formik.handleBlur}  className='form-control' id='phone' placeholder='' name='phone' onChange={formik.handleChange} value={formik.values.phone} />
      {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone} </div>:null }
      <label htmlFor='email' >email</label>
      <input type='text'  onBlur={formik.handleBlur} className='form-control' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email} </div>:null }
      <label htmlFor='password' >password</label>
      <input type='password'  onBlur={formik.handleBlur} className='form-control' id='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>{formik.errors.password} </div>:null }

      
      
      {isloading? <button type='button' className='btn btn-primary'><i className='fas fa-spinner fa-spin'></i></button>:
            <button disabled={! (formik.isValid && formik.dirty)}  type='submit' className='btn btn-primary'>Register</button>
          }

      </div>

      </form> : <Navigate to={"/Home"}/>}

  </>
}
