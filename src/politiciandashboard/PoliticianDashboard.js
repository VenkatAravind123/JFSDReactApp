import React, { useEffect, useState } from 'react'
import PoliticianSideBar from './PoliticianSideBar'
import { Route, Routes } from 'react-router-dom';
import PoliticianFeed from '../pages/PoliticianFeed';
import MyRating from '../pages/MyRating';
import PoliticianReports from '../pages/PoliticianReports';
import MyPosts from '../pages/MyPosts';
import ViewIssuePolitician from './ViewIssuePolitician';
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
      <Route path='/politiciandashboard/reports' element={<PoliticianReports/>} exact/>
      <Route path='/politiciandashboard/posts' element={<MyPosts/>} exact/>
      <Route path='/viewissue/:id' element={<ViewIssuePolitician/>} exact />
      </Routes>
    </div>
  )
}
