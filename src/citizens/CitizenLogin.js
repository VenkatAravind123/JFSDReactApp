import React, { useState } from 'react';  
import citizen from '../images/citizen.png';  // Make sure this is the correct path  
import './citizen.css';  
import { Link, useNavigate } from 'react-router-dom';  

const CitizenLogin = ({ onLogin }) => {  
  const navigate = useNavigate();  
 const [formdata,setFormData] = useState({
  email:"",
  password:""
 })

 const change = (e)=>{
  setFormData({...formdata,[e.target.id]:e.target.value})
 }
  const handleLogin = () => {  
    // Here you may include actual login authentication logic  
     // Call the login handler passed as prop  
    navigate("/citizendashboard");  
  };  

    

  return (  
    <div className='login-container'>  
      <form className='login-form'>  
        <h1>Citizen Login Form</h1>  
        <label>EMAIL ID</label>  
        <input type="email" id="email" placeholder="Enter your Email Address" value={formdata.email} onChange={change} required />  
        <label>PASSWORD</label>  
        <input type="password" id="password" placeholder="Enter your Password" value={formdata.password} onChange={change} required />  
        <div className='aline'>  
          <a href="#">Forgot Password?</a>  
          <Link to="register">Don't Have an Account?</Link>  
          <Link to='adminlogin'>Are you a Admin?</Link>
        </div> 
          <input className='login-button' type="submit" value="Login"/>
          <input className='clear-button' type="reset" value="Clear"/>  
         
      </form>  
      <img src={citizen} alt="" className='poli' />  
    </div>  
  );  
};  

export default CitizenLogin;