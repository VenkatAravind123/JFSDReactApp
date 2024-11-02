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
  return (
    <div className='content-area'>
      <div className='leaders-section'>
        <img src={leader} alt="Leader Icon" className='section-icon' />
        <h2>LEADERS</h2>
        <p>LEADERS SHAPE THE SOCIETY</p>
        <button onClick={leaderpage} className='leader'>
        <span class="text">Get Started</span>
        </button>
      </div> 
      <div className='citizens-section'>
        <h2>CITIZENS</h2>
        <p>CITIZENS CREATE THE SOCIETY</p>
        <button  onClick={citizenpage} className='citizen'>
        <span class="text">Get Started</span>
</button>
        <img src={citizens} alt="Citizens Icon" className='section-icon1' />
      </div>
    </div>
    
  )
}
