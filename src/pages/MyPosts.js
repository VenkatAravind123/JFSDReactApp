import React, { useState } from 'react'
import { IconContext } from 'react-icons/lib';
import { SideBarData } from '../politiciandashboard/SideBarData';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';

export default function MyRating() {
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = ()=>{
        setSidebar(!sidebar)
    }

    const navigate = useNavigate();

    const logout = ()=>{
        // localStorage.removeItem('isCitizenLoggedIn');
        // localStorage.removeItem('citizen');

        navigate('/politician');
        window.location.reload();
    }
  return (
    
    <IconContext.Provider value={{color:"#fff"}}>
        <div className='navbar1'>
            <Link to="#" className='menu-bars'>
            <FaBars onClick={showSidebar}/>
            <button onClick={logout} className='logout' >Logout</button> 
           </Link>
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
        <h1>MyPosts</h1>
        </IconContext.Provider>

  )
}
