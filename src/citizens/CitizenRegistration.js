import React, { useState } from 'react'
import './citizen.css'
import { Link,Routes,Route} from 'react-router-dom'
import { citizen } from '..';
import CitizenLogin from './CitizenLogin';
export default function CitizenRegistration() {

  const [password,setPassword] = useState('')
  const [repassword,setRePassword]= useState('')

  const password1 = (e)=>{
    setPassword(e.target.value);
  }
  const repassword1 = (e)=>{
    setRePassword(e.target.value)
  }
  const passwordverify = ()=>{
    if(repassword == password)
    {
      
    }
  }
  
  return (
    <div className='registration-form'>
      <div class="login">
  <div class="hader">
    <span>CITIZEN REGISTRATION</span>
    <p>Register now to become a member of the Society.</p>
  </div>
  <form action="#" method="post">
    <input type="text" placeholder="Enter Name" name="cname" required />
    <input type="email" placeholder="Enter Email" name="cemail" required />
    <input type='date' id='dob' name='dob' name="cdob" required/>
    <div class="radio-group">
    <input type="radio" id="male" name="cgender" value="MALE" required />
    <label for="male">Male</label>
    <input type="radio" id="female" name="cgender" value="FEMALE" required />
    <label for="female">Female</label>
    <input type="radio" id="others" name="cgender" value="OTHERS" required />
    <label for="others">Others</label>
</div>
<input type="text" placeholder="Enter Aadhaar Number" name="caadhaar" required />
<input type="text" placeholder="Enter Contact Number" name="ccontact" required />
    <input type="password" placeholder="Choose A Password" name="ccontact" onChange={password1} required />
    <input type="password" placeholder="Re-Enter Password" name="cecontact" onChange={repassword1} required/>
    <input type="submit" value="Register" />
    <span> Already a member? <Link to="/citizen">Login Here</Link></span>
  </form>
</div>
<Routes>
  <Route path="/citizen" element={<CitizenLogin/>}/>
</Routes>
    </div>
  )
}
