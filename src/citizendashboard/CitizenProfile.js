import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';

export default function CitizenProfile() {
  const [citizendata, setCitizenData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    aadhaarnumber: '',
    contactnumber: '',
    constituency: '', // Assuming citizens have a constituency field
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const editProfile = () => {
    navigate('/citizendashboard/updateprofile');
  };
  const changepassword = () => {
    navigate('/citizendashboard/otpverification');
  };
  useEffect(() => {
    const fetchCitizenData = () => {
      try {
        const storedCitizenData = localStorage.getItem('citizen');
        if (storedCitizenData) {
          const parsedCitizenData = JSON.parse(storedCitizenData);
          setCitizenData(parsedCitizenData);
        } else {
          setError('No citizen data found');
        }
      } catch (error) {
        console.error('Error fetching citizen data:', error);
        setError('Error loading citizen data');
      } finally {
        setLoading(false);
      }
    };

    fetchCitizenData();
  }, []);

  if (loading) {
    return <div className="profile-card1">Loading...</div>;
  }

  if (error) {
    return <div className="profile-card1">{error}</div>;
  }

  return (
    <div className="profile-card1">
      <h2>Your Profile</h2>
      {citizendata && Object.keys(citizendata).length > 0 ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {citizendata.name || 'N/A'}</p>
          <p><strong>Email:</strong> {citizendata.email || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {citizendata.dateofbirth || 'N/A'}</p>
          <p><strong>Gender:</strong> {citizendata.gender || 'N/A'}</p>
          <p><strong>Aadhaar Number:</strong> {citizendata.aadhaarnumber || 'N/A'}</p>
          <p><strong>Contact Number:</strong> {citizendata.contactnumber || 'N/A'}</p>
          <p><strong>Constituency:</strong> {citizendata.constituency || 'N/A'}</p>
        </div>
      ) : (
        <div className="profile-details">
          <p>No citizen data available</p>
        </div>
      )}
      <div className="edit-button-container">
        <button className="edit-button" onClick={editProfile}>Edit Profile</button>
        <button className="edit-button" onClick={changepassword}>Change Password</button>
      </div>
    </div>
  );
}