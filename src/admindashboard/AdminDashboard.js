import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminFeed from '../pages/AdminFeed';
import AdminManage from '../pages/AdminManage';
import AddCitizen from '../admin/AddCitizen';
import AddPolitician from '../admin/AddPolitician';
import ViewAllCitizens from '../admin/ViewAllCitizens';
import ViewAllPoliticians from '../admin/ViewAllPoliticians';
import Citizens from '../citizens/Citizens';
import Politician from './../admin/Politician';
import ViewIssueadmin from '../admin/ViewIssueadmin';
import { FaUsers, FaUserTie } from 'react-icons/fa';
import './AdminDashboard.css';
import config from '../main/config';
import Cookies from 'js-cookie';

export default function AdminDashboard() {
  const [admindata, setAdminData] = useState("");
  const [citizencount, setCitizenCount] = useState(null);
  const [politiciancount, setPoliticianCount] = useState(null);
  const location = useLocation();

  useEffect(() => {  
    const storedAdminData = localStorage.getItem('admin');  
    if (storedAdminData) {  
      const parsedAdminData = JSON.parse(storedAdminData);  
      setAdminData(parsedAdminData);  
    }  

    const fetchCitizenCount = async () => {  
      try {  
        const token = Cookies.get('admintoken');
        const response = await fetch(`${config.url}/admin/citizencount`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {  
          throw new Error('Network response was not ok');  
        }  
        const data = await response.json();  
        setCitizenCount(data); 
      } catch (error) {  
        console.error('Error fetching citizen count:', error);  
      }  
    };  

    const fetchPoliticianCount = async () => {
      try {  
        const token = Cookies.get('admintoken');
        const response = await fetch(`${config.url}/admin/politiciancount`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {  
          throw new Error('Network response was not ok');  
        }  
        const data = await response.json();  
        setPoliticianCount(data); 
      } catch (error) {  
        console.error('Error fetching politician count:', error);  
      }  
    };

    fetchCitizenCount(); 
    fetchPoliticianCount(); 
  }, []); 

  const isDashboardHome = location.pathname === '/admindashboard' || location.pathname === '/admindashboard/';

  return (
    <div className="admin-dashboard-container">  
      <AdminSideBar />  
      
      <div className="admin-main-content">
        {isDashboardHome && admindata && (
          <div className="admin-greeting-card">
            <h1>Welcome back, Admin {admindata.username}</h1>
            <p>System Command Console — Centralized Andhra Pradesh Grievance Services Control.</p>
          </div>
        )} 

        {isDashboardHome && (
          <div className="admin-stats-container">
            {citizencount !== null && (  
              <div className="admin-stat-card citizens-count-card">  
                <div className="admin-stat-icon">
                  <FaUsers />
                </div>
                <div className="admin-stat-details">
                  <h2>Registered Citizens</h2>  
                  <p>{citizencount}</p>  
                </div>
              </div>  
            )}  
            
            {politiciancount !== null && (  
              <div className="admin-stat-card politicians-count-card">  
                <div className="admin-stat-icon">
                  <FaUserTie />
                </div>
                <div className="admin-stat-details">
                  <h2>Active Representatives</h2>  
                  <p>{politiciancount}</p>  
                </div>
              </div>  
            )}
          </div>
        )}

        {!isDashboardHome && (
          <div className="admin-subroute-wrapper">
            <Routes>
              <Route path='/admindashboard/feed' element={<AdminFeed/>} exact/>
              <Route path='/admindashboard/manage' element={<AdminManage/>} exact/>
              <Route path='/admindashboard/addcitizen' element={<AddCitizen/>} exact/>
              <Route path='/admindashboard/addpolitician' element={<AddPolitician/>} exact/>
              <Route path='/admindashboard/viewallcitizens' element={<ViewAllCitizens/>} exact/>
              <Route path='/admindashboard/viewallpoliticians' element={<ViewAllPoliticians/>} exact/>
              <Route path='/displaycitizen/:id' element={<Citizens/>} exact/>
              <Route path='/displaypolitician/:id' element={<Politician/>} exact/>
              <Route path='adminviewissue/:id' element={<ViewIssueadmin/>} exact/>
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}
