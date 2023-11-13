import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Layout( {userDate,setuUserDate}) {
  let navigate = useNavigate();
  function LogOut ( ) {
    localStorage.removeItem("userToken");
    toast('Good Job!', {
      icon: '👏',
    });
    setuUserDate (null);
    console.log("hello");
    
   navigate  ("/login");


 };
  return <>
  
 <Navbar LogOut={LogOut}   userDate={userDate}   />
<Outlet></Outlet>

  </>
}
