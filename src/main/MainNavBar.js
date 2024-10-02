import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/jana.png'
import Home from './Home';
import './style.css'
import CitizenRegistration from '../citizens/CitizenRegistration';
import PoliticianLogin from '../politicians/PoliticianLogin';
import CitizenLogin from '../citizens/CitizenLogin';
import ContactUs from './ContactUs';


export default function MainNavBar() {
  return (
    <div className='app-container'>
    <nav className='navbar'>
      <div className="navbar-brand">
        <img src={logo} alt="LOGO" className='logo' />
        <h3>Jana SevaAP</h3>
      </div>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/citizen">CITIZENS</Link></li>
        <li><Link to="/politician">POLITICIANS</Link></li>
        <li><Link to="/register">REGISTRATION</Link></li>
        <li><Link to="/contactus">CONTACT US</Link></li>
      </ul>
    </nav>
    <Routes>
    <Route path='/' element={<Home/>} exact />
        <Route path='/citizen' element={<CitizenLogin/>}  exact/>
        <Route path='/politician' element={<PoliticianLogin/>} exact/>
        <Route path='/register' element={<CitizenRegistration/>} exact/>
        <Route path='/contactus' element={<ContactUs/>} exact/>
    </Routes>
    
    </div>

  )
}