import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import SideBar from './SideBar';
import Feed from '../pages/Feed';
import axios from 'axios'
import Reports from '../pages/Reports';
import FeedBack from '../pages/FeedBack';
import Issue from './Issue';
import { AiOutlineFileText } from 'react-icons/ai';
import './DashBoard.css'
import CitizenProfile from './CitizenProfile';
import UpdatePoliticianProfile from './UpdateCitizenProfile';
import OtpVerification from './OtpVerification';
import ChangePassword from './../citizendashboard/ChangePassword';
import config from '../main/config';
import CitizenSchemes from '../pages/CitizenSchemes';
import Scheme from '../pages/Scheme';
import NotFound from '../pages/NotFound';
import Cookies from 'js-cookie'; // <-- ADD THIS IMPORT

function DashBoard({chartData}) {
  const [citizendata, setCitizenData] = useState("");
  const [issuecount, setIssueCount] = useState(0);
  const [stats, setStats] = useState({
    issues: 0,
    resolved: 0,
    pending: 0
  });

  useEffect(() => {
    const token = Cookies.get('citizenToken');

    const fetchCitizenProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${config.url}/citizen/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setCitizenData(data);
        } else {
          console.error("No citizen data found from backend");
        }
      } catch (error) {
        console.error("Error fetching citizen profile", error);
      }
    };

    const fetchIssueCount = async () => {  
      if (!token) return;

      try {  
        const response = await fetch(`${config.url}/citizen/issuecount`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });  

        if (!response.ok) {  
          throw new Error('Network response was not ok. Token might be expired.');  
        }  
        
        const data = await response.json();  
        setIssueCount(data);
        
        setStats({
          issues: data,
          resolved: Math.floor(data * 0.6),
          pending: Math.floor(data * 0.4)
        });
        
      } catch (error) {  
        console.error('Error fetching citizen count:', error);  
      }  
    };  

    fetchCitizenProfile();
    fetchIssueCount();
  }, []);

  return (
    <div className="citizen-dashboard">  
      <SideBar/>  
      <div className="dashboard-main">
        <div className="dashboard-welcome">
          {/* Will show blank if citizendata is empty */}
          <h1>Welcome back, <span className="user-name">{citizendata ? citizendata.name : "Citizen"}</span></h1>
          <p>Monitor your grievances and track resolutions</p>
        </div>

        
          <div className="dashboard-stats">
            <div className="stat-card stat-issues">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>Total Issues</h3>
                <p className="stat-number">{stats.issues}</p>
              </div>
            </div>
            <div className="stat-card stat-resolved">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Resolved</h3>
                <p className="stat-number">{stats.resolved}</p>
              </div>
            </div>
            <div className="stat-card stat-pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-number">{stats.pending}</p>
              </div>
            </div>
          </div>
        

        <div className="dashboard-content">  
          <Routes>
            <Route path='/citizendashboard/feed' element={<Feed/>} exact/>
            <Route path='/citizendashboard/reports' element={<Reports/>} exact/>
            <Route path='/citizendashboard/feedback' element={<FeedBack/>} exact/>
            <Route path='/citizendashboard/schemes' element={<CitizenSchemes/>} exact/>
            <Route path='/displayissue/:id' element={<Issue/>} exact/>
            <Route path='/citizendashboard/profile' element={<CitizenProfile/>} exact/>
            <Route path='/citizendashboard/updateprofile' element={<UpdatePoliticianProfile/>} exact/>
            <Route path='/citizendashboard/otpverification' element={<OtpVerification/>} exact/>
            <Route path='/citizendashboard/changepassword' element={<ChangePassword/>} exact/>
            <Route path="/citizendashboard/schemes/:id" element={<Scheme />} exact/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default DashBoard