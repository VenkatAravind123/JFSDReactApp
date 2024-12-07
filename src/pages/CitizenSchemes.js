import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Schemes.css';
import { useNavigate } from 'react-router-dom';

const CitizenSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:2021/citizen/viewallschemes'); // Replace with your backend endpoint
        setSchemes(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);
  const navigate = useNavigate();
  
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="schemes-container">
      <h1>Government Schemes</h1>
      <div className="schemes-grid">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card" onClick={() => navigate(`/citizendashboard/schemes/${scheme.id}`)}>
            <div className="scheme-header">
              <h2>{scheme.name}</h2>
              <div className="deadline-badge">
                {calculateDaysLeft(scheme.deadline) > 0 ? (
                  `${calculateDaysLeft(scheme.deadline)} days left`
                ) : (
                  'Expired'
                )}
              </div>
            </div>
            
            <div className="scheme-content">
              <div className="info-section">
                <h3>Description</h3>
                <p>{scheme.description}</p>
              </div>
              
              <div className="info-section">
                <h3>Eligibility Criteria</h3>
                <ul>
                  {scheme.eligibilityCriteria.split(',').map((criteria, index) => (
                    <li key={index}>{criteria.trim()}</li>
                  ))}
                </ul>
              </div>
              
              <div className="info-section">
                <h3>Benefits</h3>
                <ul>
                  {scheme.benefits.split(',').map((benefit, index) => (
                    <li key={index}>{benefit.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button className="apply-button">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitizenSchemes;