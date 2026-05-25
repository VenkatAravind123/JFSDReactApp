import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SideBarData } from '../politiciandashboard/SideBarData';
import './feed.css';
import config from '../main/config';
import Cookies from 'js-cookie';

export default function PoliticianFeed() {
  const [sidebar, setSidebar] = useState(false);
  const [issues, setIssues] = useState([]);
  const [constituency, setConstituency] = useState('');
  const [error, setError] = useState('');
  const [loadingIssueId, setLoadingIssueId] = useState(null);
  const [politicianId, setPoliticianId] = useState(null);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isPoliticianLoggedIn');
    Cookies.remove('politiciantoken');
    navigate('/politician');
    window.location.reload();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('politiciantoken');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setPoliticianId(payload.id);
          
          const response = await axios.get(`${config.url}/admin/displaypoliticianbyid?id=${payload.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setConstituency(response.data.constituency);
        }
      } catch (e) {
        console.error("Failed to fetch profile in Feed", e);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = Cookies.get('politiciantoken');
        const response = await axios.get(`${config.url}/politician/viewissuesbyconstituency?constituency=${constituency}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIssues(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (constituency) {
      fetchIssues();
    }
  }, [constituency]);

  const formatDate = (dateValue) => {  
    if (!dateValue) return "Unknown Date";
    
    let date;
    if (Array.isArray(dateValue)) {
      const [year, month, day, hour, minute, second, millisecond = 0] = dateValue;  
      date = new Date(year, month - 1, day, hour, minute, second, Math.floor(millisecond / 1000000)); 
    } else {
      date = new Date(dateValue);
    }
    
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
      navigate(`/viewissue/${id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const takeCareIssue = async (issueId) => {
    try {
      setLoadingIssueId(issueId);
      const token = Cookies.get('politiciantoken');
      if (politicianId && token) {
        const response = await axios.put(`${config.url}/politician/takecareissue/${issueId}`, {
          politicianId: politicianId
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data === "Issue taken care of by politician") {
          setIssues(prevIssues => 
            prevIssues.map(issue => 
              issue.id === issueId 
                ? { ...issue, politician: { id: politicianId } } 
                : issue
            )
          );
        }
      }
    } catch (error) {
      console.error('Error taking care of issue:', error);
    } finally {
      setLoadingIssueId(null); // Clear loading state
    }
  };

  return (
    <div>
     
      <div className="feed-container">
        <h1>Politician Feed</h1>
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
                      {issue.politician && issue.politician.id === politicianId ? (
                        <button 
                          className="taken-care-button"
                          style={{ backgroundColor: 'red' }}
                          disabled
                        >
                          Taken Care
                        </button>
                      ) : (
                        <button 
                          onClick={() => takeCareIssue(issue.id)} 
                          className={`action-button ${loadingIssueId === issue.id ? 'loading' : ''}`}
                          disabled={loadingIssueId === issue.id}
                        >
                          {loadingIssueId === issue.id ? 'Processing...' : 'Take Care'}
                        </button>
                      )}
                    </div>
                    <p>Posted At: {formatDate(issue.createdAt)}</p>
                    <p>Citizen Name: {issue.citizen.name}</p>
                  </article>
                </div>
              ))
            ) : (
              <p>No issues found for the selected constituency.</p>
            )}
          </div>
        ) : (
          <div className="no-constituency">
            <p>No constituency found. Please <Link to="/politiciandashboard/updateprofile">edit your profile</Link> to add your constituency.</p>
          </div>
        )}
      </div>
    </div>
  );
}