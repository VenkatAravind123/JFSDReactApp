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
function DashBoard({chartData}) 
{
  
  const [citizendata,setCitizenData] = useState("");

  const [issuecount,setIssueCount] = useState(0);

  useEffect(() => {
    const storedCitizenData = localStorage.getItem('citizen')
    console.log(storedCitizenData)
    if(storedCitizenData)
    {
      const parsedCitizenData = JSON.parse(storedCitizenData);
      setCitizenData(parsedCitizenData)
    }


    const fetchIssueCount = async () => {  
      try {  
        const response = await fetch(`${config.url}/citizen/issuecount`);  
        if (!response.ok) {  
          throw new Error('Network response was not ok');  
        }  
        const data = await response.json();  
        setIssueCount(data); 
      } catch (error) {  
        console.error('Error fetching citizen count:', error);  
      }  
    };  

    fetchIssueCount();
  }, [])
  

  return (
    
     <div className="citizen-dashboard">  
     <SideBar/>  
     <h3>Welcome {citizendata.name}</h3>
      <div className="citizen-content">  
      {
      citizendata && (
        <div>
          
          <div className="card-container">
          {issuecount !== null && (  
            <div className="card citizen-count">  
              <AiOutlineFileText className="icon" /> 
              <h2 style={{color:"black"}}>Issues Posted</h2>  
              <p style={{color:"black"}}>{issuecount}</p>  
            </div>  
          )}  
          </div>
        </div>
      )
     } 
        </div>
     
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
     {/* <Route path='*' element={<NotFound/>} exact/> */}
     
     </Routes>
    </div>
    
  )
}

export default DashBoard