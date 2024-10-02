import React from 'react'
import './contact.css'
import { Link } from 'react-router-dom';
export default function ContactUs() {
  return (
    <div className='contact-container'>

<form class="form">
   <p class="form-title">Contact Us</p>
    <div class="input-container">
      <input type="email" placeholder="Enter email"/>
      <span>
      </span>
  </div>
  <div class="input-container">
      <textarea type="text" className='text-area' placeholder='Explain your problem here'/>
    </div>
     <button type="submit" class="submit">
    Send Email
  </button>

  <p class="signup-link">
    No account?
    <Link to="/register" style={{textDecoration:"none"}}>Register</Link>
  </p>
</form>

    </div>
  )
}
