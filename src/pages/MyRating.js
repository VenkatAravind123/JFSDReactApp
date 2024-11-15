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
    
    
        <h1>MyRating</h1>
        

  )
}
