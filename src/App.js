import logo from './logo.svg';
import './App.css';
 import{Navigate, RouterProvider, createBrowserRouter} from "react-router-dom";
 import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import NotFound from "./Components/NotFound/NotFound";
import Footer from "./Components/Footer/Footer";
import Login from './Components/Login/Login';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import  { Toaster } from 'react-hot-toast';
import Welcome from './Components/Welcome/Welcome';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() { 
  
  
 
  
  useEffect (()=>{
if(localStorage.getItem("userToken")!==null){
  saveUserData();
}
},[])

  const [userDate, setuUserDate] = useState(null);



   function saveUserData(){
    let encodedToken=  localStorage.getItem("userToken");
    let decodedToken=  jwtDecode(encodedToken);
    setuUserDate(decodedToken);
    

  };
 


let routers = createBrowserRouter ([
    { path:'', element:<Layout  userDate={userDate} setuUserDate={setuUserDate}   />, children:[
    {path:"home", element: <ProtectedRoute> <Home/></ProtectedRoute> },
    {index:true,element:<Welcome/>},
    {path:"login",element:<Login  saveUserData={saveUserData}  />},
    {path:"Register",element:<Register/>},
    {path:"*" ,element:<NotFound/>},
       
  ]}
  
])


return <>

  <Toaster/>

<Provider store={store}>
<RouterProvider router={routers} > 

</RouterProvider>
</Provider>
<Toaster/>

</>
}


export default App;
