import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaIdCard, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../main/config';
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
    const fetchCitizenData = async () => {
      try {
        const token = Cookies.get('citizenToken');
        if (token) {
          const response = await axios.get(`${config.url}/citizen/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setCitizenData(response.data);
        } else {
          setError('No authentication token found');
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
    return <div className="citizen-profile-card1">Loading...</div>;
  }

  if (error) {
    return <div className="citizen-profile-card1">{error}</div>;
  }

  const getInitials = (name) => {
    if (!name) return 'C';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="citizen-profile-card1">
      {citizendata && Object.keys(citizendata).length > 0 ? (
        <>
          <div className="citizen-profile-header-block">
            <div className="citizen-profile-avatar-large">
              {getInitials(citizendata.name)}
            </div>
            <div className="citizen-profile-meta-title">
              <h2>{citizendata.name || 'Citizen'}</h2>
              <p>Registered Citizen &amp; Voter</p>
            </div>
          </div>

          <div className="citizen-profile-details-grid">
            <div className="citizen-profile-detail-item">
              <label><FaUser /> Full Name</label>
              <span>{citizendata.name || 'N/A'}</span>
            </div>
            <div className="citizen-profile-detail-item">
              <label><FaEnvelope /> Email Address</label>
              <span>{citizendata.email || 'N/A'}</span>
            </div>
            <div className="citizen-profile-detail-item">
              <label><FaCalendarAlt /> Date of Birth</label>
              <span>{citizendata.dateofbirth || 'N/A'}</span>
            </div>
            <div className="citizen-profile-detail-item">
              <label><FaVenusMars /> Gender</label>
              <span>{citizendata.gender || 'N/A'}</span>
            </div>
            <div className="citizen-profile-detail-item">
              <label><FaIdCard /> Aadhaar Number</label>
              <span>{citizendata.aadhaarnumber || 'N/A'}</span>
            </div>
            <div className="citizen-profile-detail-item">
              <label><FaPhone /> Contact Number</label>
              <span>{citizendata.contactnumber || 'N/A'}</span>
            </div>
            <div className="citizen-profile-detail-item" style={{ gridColumn: 'span 2' }}>
              <label><FaMapMarkerAlt /> Voting Constituency</label>
              <span>{citizendata.constituency || 'N/A'}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="profile-details">
          <p>No citizen data available</p>
        </div>
      )}
      <div className="citizen-edit-button-container">
        <button className="citizen-edit-button" onClick={editProfile}>Edit Profile</button>
        <button className="citizen-edit-button" onClick={changepassword}>Change Password</button>
      </div>
    </div>
  );
}