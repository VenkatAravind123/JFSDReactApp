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
        const response = await fetch('http://localhost:2021/citizen/issuecount');  
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
      <div className="citizen-content">  
      {
      citizendata && (
        <div>
          <h3>Welcome {citizendata.name}</h3>
          <div className="card-container1">
          {issuecount !== null && (  
            <div className="card citizen-count1">  
              <AiOutlineFileText className="icon1" /> {/* Icon for citizen count */}
              <h2>Issues Posted</h2>  
              <p>{issuecount}</p>  
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
     <Route path='/displayissue/:id' element={<Issue/>} exact/>
     </Routes>
    </div>
    
  )
}

export default DashBoard