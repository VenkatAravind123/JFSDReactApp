import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  
import MainNavBar from './main/MainNavBar';  
import DashBoard from './citizendashboard/DashBoard';  
import PoliticianDashboard from './politiciandashboard/PoliticianDashboard';  
import CitizenLogin from './citizens/CitizenLogin';


function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [isPoliticianLoggedIn, setIsPoliticianLoggedIn] = useState(false);  

  const handleCitizenLogin = () => {  
    // Simulating login  
    setIsLoggedIn(true);  
  };  

  const handleCitizenLogout = () => {  
    setIsLoggedIn(false);  
  };  

  const handlePoliticianLogin = () => {  
    // Simulating politician login  
    setIsPoliticianLoggedIn(true);  
  };  

  const handlePoliticianLogout = () => {  
    setIsPoliticianLoggedIn(false);  
  };  

  return (  
    <div className="App">  
      <Router>  
        <MainNavBar />  
        {/* <Routes>  
          <Route path="/" element={isLoggedIn ? <Navigate to="/citizendashboard" /> : <CitizenLogin onLogin={handleCitizenLogin} />} />  
          <Route path="/citizendashboard" element={isLoggedIn ? <DashBoard onLogout={handleCitizenLogout} /> : <Navigate to="/" />} />  
          <Route path="/politiciandashboard" element={isPoliticianLoggedIn ? <PoliticianDashboard onLogout={handlePoliticianLogout} /> : <Navigate to="/" />} />  
        </Routes>   */}
      </Router>  
    </div>  
  );  
}  

export default App;