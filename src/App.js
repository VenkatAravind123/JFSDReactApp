import React, { useEffect, useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  
import MainNavBar from './main/MainNavBar';  
import DashBoard from './citizendashboard/DashBoard';  
import PoliticianDashboard from './politiciandashboard/PoliticianDashboard';  
import CitizenLogin from './citizens/CitizenLogin';
import AdminDashboard from './admindashboard/AdminDashboard';


function App() { 
  //total 3 modules 1)Admin 2)Citizen 3)Politician
  const [isAdminLoggedIn,setIsAdminLoggedIn] = useState(false)
  const [isCitizenLoggedIn,setIsCitizenLoggedIn] = useState(false)
  const [isPoliticianLoggedIn,setIsPoliticianLoggedIn] = useState(false)
  
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const citizenLoggedIn = localStorage.getItem('isCitizenLoggedIn') === 'true';
    const politicianLoggedIn = localStorage.getItem('isPoliticianLoggedIn') === 'true';
   
    setIsAdminLoggedIn(adminLoggedIn);
    setIsCitizenLoggedIn(citizenLoggedIn);
    setIsPoliticianLoggedIn(politicianLoggedIn);
  }, [])
  
 
  const onAdminLogin = ()=>{
    localStorage.setItem('isAdminLoggedIn','true')
    setIsAdminLoggedIn(true)
  }

  const onCitizenLogin = ()=>{
    localStorage.setItem('isCitizenLoggedIn','true')
    setIsCitizenLoggedIn(true)
  }

  const onPoliticianLogin = ()=>{
    localStorage.setItem('isPoliticianLoggedIn','true')
    setIsPoliticianLoggedIn(true)
  }
  return (  
    <div className="App">  
      <Router>  
        {
          isAdminLoggedIn ? (
            <AdminDashboard/>
          ) : isCitizenLoggedIn ? (
            <DashBoard/>
          ) : isPoliticianLoggedIn ? (
            <PoliticianDashboard/>
          ) : (
            <MainNavBar 
            onAdminLogin = {onAdminLogin}
            onCitizenLogin = {onCitizenLogin}
            onPoliticianLogin = {onPoliticianLogin}
            />
          )
        }
        
      </Router>  
    </div>  
  );  
}  

export default App;