import React from 'react'
import politician from '../images/politician.png'
import './politician.css'

export default function PoliticianLogin() {
  return (
    <div className='login-container'>
        <div className='login-form'>
            <h1> Politician Login Form</h1>
            <label>EMAIL ID</label>
            <input type="email" name="email" placeholder="Enter your email id"/>
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
        <img src={politician} alt="Politician" className='poli'/>
    </div>
  )
}
