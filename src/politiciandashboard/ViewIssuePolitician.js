import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import config from '../main/config';

export default function ViewIssuePolitician()
{
    const [issue , setIssues] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const fetchIssue = async () => 
            {
              if (id) 
             { 
                try 
                {
                  const response = await axios.get(`${config.url}/politician/displayissuebyid?id=${id}`);
                  setIssues(response.data);
                //console.log(response.data)
                } 
                catch (error) 
                {
                  console.error(error.message);
                }
              }
            };
        
            fetchIssue();
     
    }, [id])
    
    const formatDate = (dateArray) => {  
        // Create a new Date object from the array  
        // In this array: [year, month, day, hour, minute, second, millisecond]  
        const [year, month, day, hour, minute, second, millisecond] = dateArray;  
      
        // JavaScript Date months are 0-based (0 = January, 1 = February, etc.)  
        // So we need to subtract 1 from the month value  
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
    <div className="politician-issue-container">
      {issue ? (
        <div className="politician-issue-details">
          <div className="politician-issue-header">
            <h1>Issue Details</h1>
            <span className="politician-issue-status">{issue.status}</span>
          </div>
          
          <div className="politician-issue-split-layout">
            <div className="politician-issue-image">
              <img src={issue.image_url} alt="Community reported issue visual" />
            </div>

            <div className="politician-issue-content">
              <div className="politician-info-group">
                <label>Description</label>
                <p>{issue.description}</p>
              </div>

              <div className="politician-info-group">
                <label>Constituency</label>
                <p>{issue.constituency || 'N/A'}</p>
              </div>

              <div className="politician-info-group">
                <label>Reported By</label>
                <p>{issue.citizen?.name || 'Anonymous Citizen'}</p>
              </div>

              <div className="politician-info-group">
                <label>Current Status</label>
                <p className={`status-${issue.status?.toLowerCase()}`}>
                  {issue.status}
                </p>
              </div>

              <div className="politician-info-group">
                <label>Posted At</label>
                <p>{formatDate(issue.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="politician-no-data">Issue Details Not Found</div>
      )}
    </div>
  );
}
