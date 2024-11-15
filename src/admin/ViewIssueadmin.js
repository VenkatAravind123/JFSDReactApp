import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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
                  const response = await axios.get(`http://localhost:2021/admin/viewissuebyid?id=${id}`);
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
    issue ? (
        <div className='issue1-container'>
        <img src={issue.image_url} alt='Image Here' className='image' />
        <p><b>Description:</b>{issue.description}</p>
        <p><b>Status :</b> {issue.status}</p>
        <p><b>Posted At:</b>{formatDate(issue.createdAt)}</p>
        <p><b>Citizen Posted:</b>{issue.citizen.name}</p>
        </div>
        ) : (
            <p style={{ color: "red", fontWeight: "bolder" }}>Issue Data Not Found</p>
        )

  )
}
