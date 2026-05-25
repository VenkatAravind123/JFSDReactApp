import React, { useEffect, useState } from 'react'
import PoliticianSideBar from './PoliticianSideBar'
import { Route, Routes } from 'react-router-dom';
import PoliticianFeed from '../pages/PoliticianFeed';
import MyRating from '../pages/MyRating';
import MyPosts from '../pages/MyPosts';
import ViewIssuePolitician from './ViewIssuePolitician';
import PoliticianProfile from './PoliticianProfile';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import OtpVerification from './OtpVerification';
import PoliticianSchemes from '../pages/PoliticianSchemes';
import NotFound from '../pages/NotFound';
import './PoliticianDashboard.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../main/config';
export default function PoliticianDashboard() 
{
  const [politiciandata,setPoliticianData] = useState("");

  useEffect(() => {
    const fetchPoliticianName = async () => {
      try {
        const token = Cookies.get('politiciantoken');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const response = await axios.get(`${config.url}/admin/displaypoliticianbyid?id=${payload.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setPoliticianData(response.data);
        }
      } catch (error) {
        console.error("Failed to load politician details for dashboard", error);
      }
    };
    
    fetchPoliticianName();
  }, [])
  return (
    <div className="politician-dashboard">
      <PoliticianSideBar />
      <div className="politician-content">
        {politiciandata && (
          <div className="politician-welcome">
            <h1>Welcome back, <span className="user-name">{politiciandata.name}</span></h1>
            <p>Track reported community issues, engage with feedback, and review schemes</p>
          </div>
        )}

        <div className="politician-content-area">
          <Routes>
            <Route path='/politiciandashboard/feed' element={<PoliticianFeed/>} exact/>
            <Route path='/politiciandashboard/rating' element={<MyRating/>} exact/>
            <Route path='/politiciandashboard/schemes' element={<PoliticianSchemes/>} exact/>
            <Route path='/politiciandashboard/posts' element={<MyPosts/>} exact/>
            <Route path='/viewissue/:id' element={<ViewIssuePolitician/>} exact />
            <Route path='/politiciandashboard/profile' element={<PoliticianProfile/>} exact />
            <Route path='/politiciandashboard/updateprofile' element={<UpdateProfile/>} exact />
            <Route path='/politiciandashboard/changepassword' element={<ChangePassword/>} exact />
            <Route path='/politiciandashboard/otpverification' element={<OtpVerification/>} exact />
          </Routes>
        </div>
      </div>
    </div>
  );
}
