import React from 'react'
import leader from '../images/leader.png'
import citizens from '../images/citizens.png'
import './home.css'
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const leaderpage  = ()=>{
    navigate('/politician')
  }
  const citizenpage  = ()=>{
    navigate('/citizen')
  }
  // Home.js
return (
  <div className='home-container'>
    <div className='content-area'>
      <div className='section-card leaders-section'>
        <img src={leader} alt="Leader Icon" className='section-icon' />
        <h2>LEADERS</h2>
        <p>LEADERS SHAPE THE SOCIETY</p>
        <button onClick={leaderpage} className='cta-button leader-btn'>
          Login as Leader
        </button>
      </div>

      <div className='section-card citizens-section'>
        <img src={citizens} alt="Citizen Icon" className='section-icon' />
        <h2>CITIZENS</h2>
        <p>CITIZENS BUILD THE NATION</p>
        <button onClick={citizenpage} className='cta-button citizen-btn'>
          Login as Citizen
        </button>
      </div>
    </div>
  </div>
);
}