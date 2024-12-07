import React, { useState } from 'react';  
import citizen from '../images/citizen.png';  // Make sure this is the correct path  
import './citizen.css';  
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import config from '../main/config';

export default function CitizenLogin({onCitizenLogin})
{  
  const navigate = useNavigate();  
 const [formdata,setFormData] = useState({
  email:'',
  password:''
 })

 const [message,setMessage] = useState("")
 const [error,setError] = useState("")


 const change = (e)=>{
  setFormData({...formdata,[e.target.id]:e.target.value})
 }
  // const handleLogin = () => {   
  //   navigate("/citizendashboard");  
  // };  

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${config.url}/citizen/checkcitizenlogin?email=${formdata.email}&pwd=${formdata.password}`);
    // console.log("Response:", response);  // Check the full response object

    if (response.data) {
      onCitizenLogin();
      localStorage.setItem('citizen', JSON.stringify(response.data));
      navigate("/citizendashboard");
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
        <h1>Citizen Login</h1>  
        <label>EMAIL ID</label>  
        <input type="email" id="email" placeholder="Enter your Email Address" value={formdata.email} onChange={change} required />  
        <label>PASSWORD</label>  
        <input type="password" id="password" placeholder="Enter your Password" value={formdata.password} onChange={change} required />  
        <div className='aline'>  
          <a href="#">Forgot Password?</a>  
          <Link to="/register">Don't Have an Account?</Link>  
          <Link to='/adminlogin'>Are you a Admin?</Link>
        </div> 
          <input className='login-button' type="submit" value="Login"/>
          <input className='clear-button' type="reset" value="Clear"/>  
         
      </form>  
      <img src={citizen} alt="" className='poli' />  
    </div>  
  );  
};  