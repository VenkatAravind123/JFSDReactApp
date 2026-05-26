import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/jana.png'
import Home from './Home';
import '../styles/Header.css'
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

export default function MainNavBar({ onAdminLogin, onCitizenLogin, onPoliticianLogin }) {
  const [chartData, setChartData] = useState({
    // ...chart data
  });
  const location = useLocation();
  const navigate = useNavigate();
  const onLogin = ()=>{
    navigate("/citizen")
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className='app-container'>
      <header className='header'>
        <nav className='container navbar'>
          <div className="navbar-brand">
            <img src={logo} alt="LOGO" className='logo' />
            <h3>Jana SevaAP</h3>
          </div>
          <ul className="nav-links">
            <li><Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>HOME</Link></li>
            <li><Link to="/citizen" className={`nav-link ${isActive('/citizen') ? 'active' : ''}`}>CITIZENS</Link></li>
            <li><Link to="/politician" className={`nav-link ${isActive('/politician') ? 'active' : ''}`}>POLITICIANS</Link></li>
            <li><Link to="/register" className={`nav-link ${isActive('/register') ? 'active' : ''}`}>REGISTRATION</Link></li>
            <li><Link to="/contactus" className={`nav-link ${isActive('/contactus') ? 'active' : ''}`}>CONTACT US</Link></li>
          </ul>
          <div className="nav-actions">
            <button className="btn-login" onClick={onLogin}>Login</button>
            <button className="mobile-menu-btn">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/citizen' element={<CitizenLogin onCitizenLogin={onCitizenLogin} />} exact />
          <Route path='/politician' element={<PoliticianLogin onPoliticianLogin={onPoliticianLogin} />} exact />
          <Route path='/register' element={<CitizenRegistration />} exact />
          <Route path='/contactus' element={<ContactUs />} exact />
          <Route path='/citizendashboard/*' element={<DashBoard chartData={chartData} />} exact />
          <Route path='/politiciandashboard/*' element={<PoliticianDashboard />} exact />
          <Route path='/adminlogin' element={<AdminLogin onAdminLogin={onAdminLogin} />} exact />
          <Route path='/admindashboard/*/*' element={<AdminDashboard />} exact />
          <Route path='*' element={<NotFound />} exact />
        </Routes>
      </main>
    </div>
  )
}