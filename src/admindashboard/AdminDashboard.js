import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom';
import AdminFeed from '../pages/AdminFeed';
import AdminManage from '../pages/AdminManage';
import AddCitizen from '../admin/AddCitizen';
import AddPolitician from '../admin/AddPolitician';
import ViewAllCitizens from '../admin/ViewAllCitizens';
import ViewAllPoliticians from '../admin/ViewAllPoliticians';
import Citizens from '../citizens/Citizens';
import Politician from './../admin/Politician';
import ViewIssueadmin from '../admin/ViewIssueadmin';
import { AiOutlineFileText, AiOutlineForm } from 'react-icons/ai';
import './AdminDashboard.css'
import config from '../main/config';
import NotFound from '../pages/NotFound';

export default function AdminDashboard() 
{
  const [admindata,setAdminData] = useState("");
  const [citizencount,setCitizenCount] = useState(null);
  const [politiciancount,setPoliticianCount] = useState(null);

  useEffect(() => {  
    const storedAdminData = localStorage.getItem('admin');  
    if (storedAdminData) {  
      const parsedAdminData = JSON.parse(storedAdminData);  
      setAdminData(parsedAdminData);  
    }  

    const fetchCitizenCount = async () => {  
      try {  
        const response = await fetch(`${config.url}/admin/citizencount`);  
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
        const response = await fetch(`${config.url}/admin/politiciancount`);  
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

  

  return (
  <div className="admin-dashboard">  
      <AdminSideBar />  
      {admindata && <h1>Welcome Admin {admindata.username}</h1>} 
        <br/> 
      <div className="admin-content">  
        <div className="card-container">
          {citizencount !== null && (  
            <div className="card citizen-count">  
              <AiOutlineFileText className="icon" /> {/* Icon for citizen count */}
              <h2 style={{color:"black"}}>Citizen Count</h2>  
              <p style={{color:"black"}}>{citizencount}</p>  
            </div>  
          )}  
          
          {politiciancount !== null && (  
            <div className="card politician-count">  
              <AiOutlineForm className="icon" /> {/* Icon for politician count */}
              <h2 style={{color:"black"}}>Politician Count</h2>  
              <p style={{color:"black"}}>{politiciancount}</p>  
            </div>  
          )}
        </div>
        </div>
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
     {/* <Route path='*' element={<NotFound/>} exact/> */}
     </Routes>
    </div>
  )
}
