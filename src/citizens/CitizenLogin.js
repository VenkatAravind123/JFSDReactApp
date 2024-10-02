import React from 'react'
import citizen from '../images/citizen.png'
export default function CitizenLogin() {
  return (
    
      <div className='login-container'>
        <div className='login-form'>
            <h1> Citizen Login Form</h1>
            <label>EMAIL ID</label>
            <input type="email" name="email" placeholder="Enter your email Id"/>
            <label>PASSWORD</label>
            <input type="password" name="password" placeholder="Enter your password"/>
            <div className='aline'>
            <a href="#">Forgot Password?</a>
            <a href="#">Don't Have an Account</a>
            </div>
            <div className='button-class'>
            <button className='login-button'>LOGIN</button>
            <button className='clear-button'>CLEAR</button>
            </div>
        </div>
        <img src={citizen} alt="" className='poli'/>
    </div>
    
  )
}
