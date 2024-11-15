import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
import { AdminSideBarData } from './../admindashboard/AdminSideBarData';
import axios from "axios";
import './feed.css'


function AdminFeed() {
    const [sidebar, setSidebar] = useState(false);
  const [issues, setIssues] = useState([]);
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

 // Function to format the date  
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
  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:2021/admin/viewallissues');
      setIssues(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);


  const displayIssue = async (id) => 
    {
        try 
        {
          navigate(`/adminviewissue/${id}`)
        } 
        catch (error) 
        {
          console.error(error.message);
        }
    
    }
  return (
 
      <div className='feed'>
      {issues.length > 0 ? (
        issues.map((issue, index) => (
          <div key={index} className="issue-container">
            <article className="cta">
              <img src={issue.image_url} alt={`Image for ${issue.description}`} className="issue-image" />
              <div className="cta__text-column">
                <h2>{issue.description}</h2>
                <button onClick={()=>displayIssue(issue.id)}>Read all about it</button>
              </div>
              <p>Posted At:{formatDate(issue.createdAt)}</p>
              <p>Citizen Name:{issue.citizen.name}</p>
            </article>
            
          </div>
        ))
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No Issues Found</p>
      )}
      </div>
    // </IconContext.Provider>
  );
  }
  
  
  export default AdminFeed