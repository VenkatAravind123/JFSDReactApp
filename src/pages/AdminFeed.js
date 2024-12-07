import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AdminSideBarData } from './../admindashboard/AdminSideBarData';
import axios from "axios";
import './feed.css';
import config from './../main/config';

function AdminFeed() {
  const [sidebar, setSidebar] = useState(false);
  const [issues, setIssues] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  
  const constituencies = [
    { id: 1, name: 'Visakhapatnam' },
    { id: 2, name: 'Vijayawada' },
    { id: 3, name: 'Guntur' },
    { id: 4, name: 'Nellore' },
    { id: 5, name: 'Kurnool' },
    { id: 6, name: 'Rajahmundry' },
    { id: 7, name: 'Tirupati' },
    { id: 8, name: 'Kadapa' },
    { id: 9, name: 'Ananthapuram' },
    { id: 10, name: 'Kakinada' }
  ];

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/viewissuebyconstituency/${selectedConstituency}`);
        setIssues(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (selectedConstituency) {
      fetchIssues();
    } else {
      // Fetch all issues if no constituency is selected
      const fetchAllIssues = async () => {
        try {
          const response = await axios.get(`${config.url}/admin/viewallissues`);
          setIssues(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchAllIssues();
    }
  }, [selectedConstituency]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  const displayIssue =async (id) => {
    try 
        {
          navigate(`/adminviewissue/${id}`)
        } 
        catch (error) 
        {
          console.error(error.message);
        }

  };

  return (
    <div>
      
      <div className="feed-container">
        <div>
          <label htmlFor="constituency-select">Select Constituency:</label>
          <select
            id="constituency-select"
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
          >
            <option value="">All Constituencies</option>
            {constituencies.map((constituency) => (
              <option key={constituency.id} value={constituency.name}>
                {constituency.name}
              </option>
            ))}
          </select>
        </div>
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
                  <p>Citizen Name: {issue.citizen.name}</p>
                </article>
              </div>
            ))
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>No issues found for the selected constituency.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminFeed;