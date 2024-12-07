import React, { useState } from 'react'
import politician from '../images/politician.png'
import './politician.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../main/config';

export default function PoliticianLogin({onPoliticianLogin}) 
{
  const navigate = useNavigate();  
 const [formdata,setFormData] = useState({
  email:"",
  password:""
 }) 
 const [message,setMessage] = useState('');
 const [error, setError] = useState('');

  const change = (e)=>{
    setFormData({...formdata,[e.target.name]:e.target.value})
  }
   const handleSubmit = async (e)=>{
    e.preventDefault();
  try {
    const response = await axios.post(`${config.url}/politician/checkpoliticianlogin?email=${formdata.email}&pwd=${formdata.password}`);
    // console.log("Response:", response);  // Check the full response object
console.log(response)
    if (response.data) {
      onPoliticianLogin();
      localStorage.setItem('politician', JSON.stringify(response.data));
      navigate("/politiciandashboard");
    } else {
      setMessage("Login Failed");
      setError("");
    }
  } catch (error) {
    setMessage("");
    setError(error.message);
  }
   }

  return (
    <div className='login-container2'>
      {
      message ? <h4>{message}</h4> : <h4 style={{color:"red"}}>{error}</h4>
    }
        <form className='login-form2' onSubmit={handleSubmit}>
            <h1> Politician Login</h1>
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
