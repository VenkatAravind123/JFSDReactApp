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
export default function PoliticianDashboard() 
{
  const [politiciandata,setPoliticianData] = useState("");

  useEffect(() => {
    const storedPoliticianData = localStorage.getItem('politician')
    console.log(storedPoliticianData)
    if(storedPoliticianData)
    {
      const parsedPoliticianData = JSON.parse(storedPoliticianData);
      setPoliticianData(parsedPoliticianData)
    }
  
  }, [])
  return (
    <div className='politician-dashboard'>
      <PoliticianSideBar/>
      <div className="politician-content">  
      {
      politiciandata && (
        <div>
          <h3>Welcome {politiciandata.name}</h3>
        </div>
      )
     }
     </div>
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
      {/* <Route path='*' element={<NotFound/>} exact/> */}
      </Routes>
    </div>
  )
}
