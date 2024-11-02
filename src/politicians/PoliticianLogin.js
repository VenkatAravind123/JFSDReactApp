import React, { useState } from 'react'
import politician from '../images/politician.png'
import './politician.css'
import { useNavigate } from 'react-router-dom';

export default function PoliticianLogin() 
{
  const navigate = useNavigate();  
 const [formdata,setFormData] = useState({
  email:"",
  password:""
 }) 

  const handleLogin = () => {  
    // Here you may include actual login authentication logic  
     // Call the login handler passed as prop  
    navigate("/politiciandashboard");  // Navigate to the citizen dashboard  
  };  

  const change = (e)=>{
    setFormData({...formdata,[e.target.id]:e.target.value})
  }
   

  return (
    <div className='login-container'>
        <form className='login-form'>
            <h1> Politician Login Form</h1>
            <label>EMAIL ID</label>
            <input type="email" name="email" placeholder="Enter your Email Address" value={formdata.email} onChange={change} required/>
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Enter your Password" value={formdata.password}  onChange={change} required/>
            <div className='aline'>
            <a href="#">Forgot Password?</a>
            <a href="#">Don't Have an Account? then Contact the Administrator</a>
            </div>
            <input className='login-button' type="submit"  value="Login"/>
          <input className='clear-button' type="reset"  value="Clear"/> 
        </form>
        <img src={politician} alt="Politician" className='poli'/>
    </div>
  )
}
