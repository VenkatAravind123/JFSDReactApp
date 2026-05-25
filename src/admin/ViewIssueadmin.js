import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import config from '../main/config';
import Cookies from 'js-cookie';

export default function ViewIssueadmin() 
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
                  const token = Cookies.get('admintoken');
                  const response = await axios.get(`${config.url}/admin/viewissuebyid?id=${id}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });
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
  return (
    issue ? (
        <div className='issue1-container'>
          <img src={issue.image_url} alt='Issue Visual' className='image' />
          <div className='issue1-container-details'>
            <p><b>Description</b> <span>{issue.description}</span></p>
            <p>
              <b>Status</b> 
              <span className={`admin-status-badge status-${issue.status.toLowerCase()}`}>
                {issue.status}
              </span>
            </p>
            <p><b>Posted At</b> <span>{formatDate(issue.createdAt)}</span></p>
            <p><b>Citizen Posted</b> <span>{issue.citizen.name}</span></p>
          </div>
        </div>
    ) : (
        <p style={{ color: "red", fontWeight: "bolder", textAlign: 'center', padding: '40px' }}>Issue Data Not Found</p>
    )
  );
}
