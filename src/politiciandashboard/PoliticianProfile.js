import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Politician.css'
import { useNavigate } from 'react-router-dom';

export default function PoliticianProfile() {
  const [politiciandata, setPoliticianData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    contactnumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const editprofile = () => {
    navigate('/politiciandashboard/updateprofile');
  };
  const changepassword = () => {
    navigate('/politiciandashboard/otpverification');
  }

  useEffect(() => {
    const fetchPoliticianData = () => {
      try {
        const storedPoliticianData = localStorage.getItem('politician');
        //console.log('Stored Politician Data:', storedPoliticianData); // Debug log

        if (storedPoliticianData) {
          const parsedPoliticianData = JSON.parse(storedPoliticianData);
          //console.log('Parsed Politician Data:', parsedPoliticianData); // Debug log
          setPoliticianData(parsedPoliticianData);
        } else {
          setError('No politician data found');
        }
      } catch (error) {
        console.error('Error fetching politician data:', error);
        setError('Error loading politician data');
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticianData();
  }, []);

  if (loading) {
    return <div class="loader"></div>;
  }
  /* HTML: <div class="loader"></div> */


  if (error) {
    return <div className="profile-card1">{error}</div>;
  }
 

  return (
    // PoliticianProfile.js
<div className="profile-card1">
  <h2>Politician Profile</h2>
  {politiciandata && Object.keys(politiciandata).length > 0 ? (
    <div className="profile-details">
      <p><strong>Name:</strong> {politiciandata.name || 'N/A'}</p>
      <p><strong>Email:</strong> {politiciandata.email || 'N/A'}</p>
      <p><strong>Date of Birth:</strong> {politiciandata.dateofbirth || 'N/A'}</p>
      <p><strong>Gender:</strong> {politiciandata.gender || 'N/A'}</p>
      <p><strong>Contact Number:</strong> {politiciandata.contactnumber || 'N/A'}</p>
      <p><strong>Constituency:</strong> {politiciandata.constituency || 'N/A'}</p>
      <p><strong>Category:</strong> {politiciandata.category || 'N/A'}</p>
      <p><strong>Party Name:</strong> {politiciandata.party || 'N/A'}</p>
    </div>
  ) : (
    <div className="profile-details">
      <p>No politician data available</p>
    </div>
  )}
  <div className="edit-button-container">
    <button className="edit-button" onClick={editprofile}>Edit Profile</button>
    <button className="edit-button" onClick={changepassword}>Change Password</button>
  </div>
</div>
  );
}