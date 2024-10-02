import React from 'react'
import leader from '../images/leader.png'
import citizens from '../images/citizens.png'
import './home.css'
export default function Home() {
  return (
    <div className='content-area'>
      <div className='leaders-section'>
        <img src={leader} alt="Leader Icon" className='section-icon' />
        <h2>LEADERS</h2>
        <p>LEADERS SHAPE THE SOCIETY</p>
        <button>
    Get Started
    <div class="arrow-wrapper">
        <div class="arrow"></div>

    </div>
</button>
      </div>
      <div className='citizens-section'>
        <h2>CITIZENS</h2>
        <p>CITIZENS CREATE THE SOCIETY</p>
        <button className='button1'>
    Get Started
    <div class="arrow-wrapper1">
        <div class="arrow1"></div>
    </div>
</button>
        <img src={citizens} alt="Citizens Icon" className='section-icon1' />
      </div>
    </div>
    
  )
}
