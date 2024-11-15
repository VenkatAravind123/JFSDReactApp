import React, { useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { SideBarData } from './SideBarData';
import mylogo from '../images/jana.png'
import './PoliticianSideBar.css'

export default function PoliticianSideBar() {
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = ()=>{
        setSidebar(!sidebar)
    }
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem('isPoliticianLoggedIn');
        localStorage.removeItem('politician');

        navigate('/politician');
        window.location.reload();
    }
  return (
    
    <IconContext.Provider value={{color:"#fff"}}>
        <div className='navbar2'>
            
            <Link to="#" className='menu-bars1'>
            <FaBars onClick={showSidebar}/> 
           </Link>
           <img src={mylogo} alt="Logo" className="politician-logo" />
           <h3>Politician Dashboard</h3>
           <button onClick={logout} className='logout13' >Logout</button>
        </div>
        
        <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'>
                    <AiOutlineClose /></Link>
                </li>
                {SideBarData.map((item,index)=>{
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </IconContext.Provider>

  )
}
