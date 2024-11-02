import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa6';
import { IconContext } from 'react-icons/lib';
import { Link, useNavigate } from 'react-router-dom';

import './AdminDashboard.css'
import { AdminSideBarData } from './../admindashboard/AdminSideBarData';

function AdminSideBar() {
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = ()=>{
        setSidebar(!sidebar)
    }
    const navigate = useNavigate();

    const logout = ()=>{
        // localStorage.removeItem('isCitizenLoggedIn');
        // localStorage.removeItem('citizen');

        navigate('/citizen');
        window.location.reload();
    }
  return (
    
    <IconContext.Provider value={{color:"#fff"}}>
        <div className='navbar1'>
            <Link to="#" className='menu-bars'>
            <FaBars onClick={showSidebar}/> 
           </Link>
           <button onClick={logout} className='logout' >Logout</button>
        </div>
        
        <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'>
                    <AiOutlineClose /></Link>
                </li>
                {AdminSideBarData.map((item,index)=>{
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

export default AdminSideBar