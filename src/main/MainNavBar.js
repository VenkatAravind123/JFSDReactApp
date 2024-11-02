import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/jana.png'
import Home from './Home';
import './style.css'
import CitizenRegistration from '../citizens/CitizenRegistration';
import PoliticianLogin from '../politicians/PoliticianLogin';
import CitizenLogin from '../citizens/CitizenLogin';
import ContactUs from './ContactUs';
import DashBoard from '../citizendashboard/DashBoard';
import Feed from '../pages/Feed';
import Reports from '../pages/Reports';
import FeedBack from '../pages/FeedBack';
import PoliticianDashboard from '../politiciandashboard/PoliticianDashboard';
import PoliticianFeed from '../pages/PoliticianFeed';
import PoliticianReports from '../pages/PoliticianReports';
import MyRating from './../pages/MyRating';
import MyPosts from './../pages/MyPosts';
import AdminDashboard from '../admindashboard/AdminDashboard';
import AdminFeed from '../pages/AdminFeed';
import AdminManage from '../pages/AdminManage';
import AdminLogin from '../admin/AdminLogin';

export default function MainNavBar() {
  return (
    <div className='app-container'>
    <nav className='navbar'>
      <div className="navbar-brand">
        <img src={logo} alt="LOGO" className='logo' />
        <h3>Jana SevaAP</h3>
      </div>
      <ul className="nav-links">
        <li><Link to="/JFSDReactApp">HOME</Link></li>
        <li><Link to="/citizen">CITIZENS</Link></li>
        <li><Link to="/politician">POLITICIANS</Link></li>
        <li><Link to="/register">REGISTRATION</Link></li>
        <li><Link to="/contactus">CONTACT US</Link></li>
      </ul>
    </nav>
    <Routes>
    <Route path='/JFSDReactApp' element={<Home/>} exact />
        <Route path='/citizen' element={<CitizenLogin/>}  exact/>
        <Route path='/politician' element={<PoliticianLogin/>} exact/>
        <Route path='/register' element={<CitizenRegistration/>} exact/>
        <Route path='/contactus' element={<ContactUs/>} exact/>
        <Route path='/citizendashboard' element={<DashBoard/>}/>
     <Route path='/citizendashboard/feed' element={<Feed/>}/>
      <Route path='/citizendashboard/reports' element={<Reports/>}/>
      <Route path='/citizendashboard/feedback' element={<FeedBack/>}/>
      <Route path='/politiciandashboard' element={<PoliticianDashboard/>}/>
      <Route path='/politiciandashboard/feed' element={<PoliticianFeed/>}/>
      <Route path='/politiciandashboard/rating' element={<MyRating/>}/>
      <Route path='/politiciandashboard/reports' element={<PoliticianReports/>}/>
      <Route path='/politiciandashboard/posts' element={<MyPosts/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
<Route path='/admindashboard' element={<AdminDashboard/>}/>
<Route path='/admindashboard/feed' element={<AdminFeed/>}/>
<Route path='/admindashboard/manage' element={<AdminManage/>}/>
  
        
    </Routes>
    <footer style={{ textAlign:"center", fontWeight:"bold" ,paddingBottom:"10px"}}>
            <p>&copy; {new Date().getFullYear()} Jana SevaAP All Rights Reserved</p>
    </footer>
    </div>

  )
}