import   './Navbar.css';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Navbar({userDate, LogOut}) {
  

  return <>
  


  
    <nav className=" navbar navbar-expand-lg bg-body-tertiary container-fluid p-3 m-auto    bg-light">
<div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        {userDate!==null ?
      <ul className="navbar-nav   ">


        <li className='nav-item active w-100  '>
        </li >
        <li className='  m-1'> 
        </li>

        

      
        </ul>:null}

        <ul className="navbar-nav ms-auto m-2   ">
          <li className='d-flex  align-items-center me-3' >
          <a target="_blank" href="https:Fb.com/7atem.a7med"><i className="fa-brands fa-facebook-f fa-2xl m-3"></i> </a>   
      <a target="_blank"  href="https://www.instagram.com/hatemabdelnoor/">  <i className="fa-brands fa-instagram fa-2xl m-3"></i></a>   
        <a target="_blank"  href="https://github.com/HatemAbdelnoor">  <i className="fa-brands fa-github fa-2xl m-3"></i></a>   
          <a target="_blank"  href="https://www.linkedin.com/in/hatem-abdelnoor-28ab04156/"> <i className="fa-brands fa-linkedin fa-2xl m-3"></i></a>   
            </li>
            {userDate===null ? 
            <>
              <li className="nav-item">
      <a href=""> <Link className="nav-link" to="login">Login</Link></a> 
        </li> 
        <li className="nav-item">
    <a>    <Link className="nav-link" to="register">Register</Link></a>  
        </li>
            </>:
      
    <li className='nav-item'>
      <a href="">  <li onClick={LogOut}   className='<li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">Home</a>
        </li> ' >Logout  </li>
    </a></li> }
    
    </ul>
  
    </div>
    </div>
  </nav>
   
  </>

 };