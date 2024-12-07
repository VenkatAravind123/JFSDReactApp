import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/jana.png'
import Home from './Home';
import './style.css'
import CitizenRegistration from '../citizens/CitizenRegistration';
import PoliticianLogin from '../politicians/PoliticianLogin';
import CitizenLogin from '../citizens/CitizenLogin';
import ContactUs from './ContactUs';
import DashBoard from '../citizendashboard/DashBoard';

import PoliticianDashboard from '../politiciandashboard/PoliticianDashboard';
import AdminDashboard from '../admindashboard/AdminDashboard';
import AdminLogin from '../admin/AdminLogin';
import NotFound from '../pages/NotFound';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
export default function MainNavBar({ onAdminLogin,onCitizenLogin,onPoliticianLogin}) 
{
  const [chartData, setChartData] = useState({
    // ...chart data
  });

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
        <Route path='/citizen' element={<CitizenLogin onCitizenLogin={onCitizenLogin}/>}  exact/>
        <Route path='/politician' element={<PoliticianLogin onPoliticianLogin={onPoliticianLogin}/>} exact/>
        <Route path='/register' element={<CitizenRegistration/>} exact/>
        <Route path='/contactus' element={<ContactUs/>} exact/>
        <Route path='/citizendashboard/*' element={<DashBoard chartData={chartData}/>} exact/>
      <Route path='/politiciandashboard/*' element={<PoliticianDashboard/>} exact/>
      
      <Route path='/adminlogin' element={<AdminLogin onAdminLogin={onAdminLogin}/>} exact/>
<Route path='/admindashboard/*/*' element={<AdminDashboard/>} exact/>

<Route path='*' element={<NotFound/>} exact/>
  
        
    </Routes>
    <footer style={{ textAlign:"center", fontWeight:"bold" ,paddingBottom:"10px"}}>
            <p style={{color:"black"}}>&copy; {new Date().getFullYear()} Jana SevaAP All Rights Reserved</p>
    </footer>
    </div>

  )
}