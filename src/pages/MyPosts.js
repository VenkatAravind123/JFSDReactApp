import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../main/config';
import './MyPosts.css';

function MyPosts() {
  const [sidebar, setSidebar] = useState(false);
  const [politicianId, setPoliticianId] = useState(null);
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPoliticianData = localStorage.getItem('politician');
    if (storedPoliticianData) {
      const parsedPoliticianData = JSON.parse(storedPoliticianData);
      setPoliticianId(parsedPoliticianData.id);
      console.log(parsedPoliticianData.id)
    }
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      if (politicianId) {
        try {
          const response = await axios.get(`${config.url}/politician/issuebypolitician/${politicianId}`);
          setIssues(response.data);
        } catch (error) {
          console.error('Error fetching issues:', error);
        }
      }
    };

    fetchIssues();
  }, [politicianId]);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

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
  return (
    <div className="myposts-container">
      <h1>MyPosts</h1>
      {politicianId && issues.length > 0 ? (
        <div className="issues-container">
          <h3>Issues for Politician ID: {politicianId}</h3>
          <ul className="issues-list">
            {issues.map(issue => (
              <li key={issue.id} className="issue-item">
                <p><strong>Description:</strong> {issue.description}</p>
                <p><strong>Status:</strong> {issue.status}</p>
                <p><strong>Constituency:</strong> {issue.constituency}</p>
                <p><strong>Created At:</strong> {formatDate(issue.createdAt)}</p>
                {issue.imageUrl && <img src={issue.imageUrl} alt="Issue" className="issue-image" />}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No issues found for this politician.</p>
      )}
    </div>
  );
}

export default MyPosts;