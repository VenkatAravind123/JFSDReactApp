import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import '../citizendashboard/SideBar.css';
import axios from 'axios';
import { SideBarData } from '../citizendashboard/SideBarData';
import './feed.css';
import config from '../main/config';

function Feed() {
  const [sidebar, setSidebar] = useState(false);
  const [issues, setIssues] = useState([]);
  const [constituency, setConstituency] = useState('');
  const [error, setError] = useState('');

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isCitizenLoggedIn');
    localStorage.removeItem('citizen');
    navigate('/citizen');
    window.location.reload();
  };

  useEffect(() => {
    const storedCitizenData = localStorage.getItem('citizen');
    if (storedCitizenData) {
      const parsedCitizenData = JSON.parse(storedCitizenData);
      setConstituency(parsedCitizenData.constituency);
    }
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${config.url}/citizen/viewissuesbyconstituency?constituency=${constituency}`);
        setIssues(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (constituency) {
      fetchIssues();
    }
  }, [constituency]);

  const formatDate = (dateArray) => {  
    const [year, month, day, hour, minute, second, millisecond] = dateArray;  
    const date = new Date(year, month - 1, day, hour, minute, second, Math.floor(millisecond / 1000)); // convert nanoseconds to seconds  
    const options = {  
      year: 'numeric',   
      month: 'long',  
      day: 'numeric',   
      hour: '2-digit',   
      minute: '2-digit',   
      second: '2-digit',   
      hour12: true  
    };  
    return date.toLocaleString(undefined, options);  
  }; 

  const displayIssue = async (id) => {
    try {
      navigate(`/displayissue/${id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      
      <div className="feed-container">
        {/* <h1>Citizen Feed</h1> */}
        {constituency ? (
          <div className='feed'>
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <div key={index} className="issue-container">
                  <article className="cta">
                    <img src={issue.image_url} alt={`Image for ${issue.description}`} className="issue-image" />
                    <div className="cta__text-column">
                      <h2>{issue.description}</h2>
                      <button onClick={() => displayIssue(issue.id)}>Read all about it</button>
                    </div>
                    <p>Posted At: {formatDate(issue.createdAt)}</p>
                    <p>Posted By: {issue.citizen.name}</p>
                  </article>
                </div>
              ))
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p style={{color:"black"}}>No issues found for the selected constituency.</p>
            )}
          </div>
        ) : (
          <div className="no-constituency">
            <p style={{color:"black"}}>No constituency found. Please <Link to="/citizendashboard/updateprofile">edit your profile</Link> to add your constituency.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;