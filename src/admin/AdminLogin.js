import React, { useState } from 'react'
import admin from '../images/admin.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function AdminLogin( {onAdminLogin}) 
{

  const navigate = useNavigate();  
  const [formdata,setFormData] = useState({
   username:'',
   password:''
  })
 
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")


  const change = (e)=>{
    setFormData({...formdata,[e.target.id]:e.target.value})
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:2021/admin/checkadminlogin?username=${formdata.username}&pwd=${formdata.password}`);
      // console.log("Response:", response);  // Check the full response object
  console.log(response.data)
      if (response.data) {
        onAdminLogin();
        localStorage.setItem('admin', JSON.stringify(response.data));
        navigate("/admindashboard");
      } else {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    
      <div className='login-container-c'>  
    {
      message ? <h4>{message}</h4> : <h4 style={{color:"red"}}>{error}</h4>
    }
      <form className='login-form-c' onSubmit={handleSubmit}>  
        <h1>Admin Login</h1>  
        <label>EMAIL ID</label>  
        <input type="text" id="username" placeholder="Enter your Username" value={formdata.username} onChange={change} required />  
        <label>PASSWORD</label>  
        <input type="password" id="password" placeholder="Enter your Password" value={formdata.password} onChange={change} required />  
        <div className='line'>  
          <a href="#">Forgot Password?</a>  
        </div> 
          <input className='login-button' type="submit" value="Login"/>
          <input className='clear-button' type="reset" value="Clear"/>  
         
      </form>  
      <img src={admin} alt="" className='admin-img' />  
    </div>  
    
  )
}

