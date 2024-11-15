import React from 'react';
import './feed.css'; // Make sure to create this CSS file
import { BsPeopleFill } from "react-icons/bs";
// Import icons (or replace with your actual image paths)
import { FaUserFriends, FaUserTie, FaCrown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaPeopleGroup } from 'react-icons/fa6';


export default function AdminManage() 
{
    const navigate = useNavigate()
    const addcitizen = ()=>{
        navigate("/admindashboard/addcitizen")
    }


    const addpolitician = ()=>{
        navigate("/admindashboard/addpolitician")
    }
    const viewallcitizens = ()=>{
        navigate("/admindashboard/viewallcitizens")
    }
    const viewallpoliticians = ()=>{
        navigate("/admindashboard/viewallpoliticians")
    }
  return (
    <div className="admin-manage-container">
      <h2>Admin Manage</h2>
      <div className="admin-options">
        <div className="admin-option" onClick={addcitizen}>
          <FaUserFriends className="icon" />
          <p>Add Citizen</p>
        </div>
        <div className="admin-option" onClick={addpolitician}>
          <FaUserTie className="icon" />
          <p>Add Politician</p>
        </div>
        <div className="admin-option">
          <FaPeopleGroup className="icon" onClick={viewallcitizens}/>
          <p>View All Citizens</p>
        </div>
        <div className="admin-option">
          
          <BsPeopleFill className="icon" onClick={viewallpoliticians}/>
          <p>View All Politicians</p>
        </div>
      </div>
    </div>
  );
}
