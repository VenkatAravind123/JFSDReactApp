import React from 'react'
import './citizen.css'
import { Link,Routes,Route} from 'react-router-dom'
import { citizen } from '..';
import CitizenLogin from './CitizenLogin';
export default function CitizenRegistration() {
  return (
    <div className='registration-form'>
      <div class="login">
  <div class="hader">
    <span>CITIZEN REGISTRATION</span>
    <p>Register now to become a member of the Society.</p>
  </div>
  <form action="#" method="post">
    <input type="text" placeholder="Enter Name" required />
    <input type="email" placeholder="Enter Email" required />
    <input type='date' id='dob' name='dob' required/>
    <div class="radio-group">
    <input type="radio" id="male" name="egender" value="MALE" required />
    <label for="male">Male</label>
    <input type="radio" id="female" name="egender" value="FEMALE" required />
    <label for="female">Female</label>
    <input type="radio" id="others" name="egender" value="OTHERS" required />
    <label for="others">Others</label>
</div>
<input type="text" placeholder="Enter Aadhaar Number" required />
<input type="text" placeholder="Enter Contact Number" required />
    <input type="password" placeholder="Choose A Password" required />
    <input type="password" placeholder="Re-Enter Password"  required/>
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
