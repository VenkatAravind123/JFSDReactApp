import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Politician.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaPhone, FaMapMarkerAlt, FaTag, FaBuilding } from 'react-icons/fa';
import config from '../main/config';
import Cookies from 'js-cookie';

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
    const fetchPoliticianData = async () => {
      try {
        const token = Cookies.get('politiciantoken');
        
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          
          // Fetch full profile from the backend
          const response = await axios.get(`${config.url}/admin/displaypoliticianbyid?id=${payload.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          setPoliticianData(response.data);
        } else {
          setError('No authentication token found');
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
    return (
      <div className="politician-profile-card1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0' }}>
        <p style={{ color: '#64748b', fontWeight: '600' }}>Loading Profile Details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="politician-profile-card1">{error}</div>;
  }

  const getInitials = (name) => {
    if (!name) return 'P';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="politician-profile-card1">
      {politiciandata && Object.keys(politiciandata).length > 0 ? (
        <>
          <div className="politician-profile-header-block">
            <div className="politician-profile-avatar-large">
              {getInitials(politiciandata.name)}
            </div>
            <div className="politician-profile-meta-title">
              <h2>{politiciandata.name || 'Representative'}</h2>
              <p>Government Representative &amp; Politician</p>
            </div>
          </div>

          <div className="politician-profile-details-grid">
            <div className="politician-profile-detail-item">
              <label><FaUser /> Full Name</label>
              <span>{politiciandata.name || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaEnvelope /> Email Address</label>
              <span>{politiciandata.email || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaCalendarAlt /> Date of Birth</label>
              <span>{politiciandata.dateofbirth || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaVenusMars /> Gender</label>
              <span>{politiciandata.gender || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaPhone /> Contact Number</label>
              <span>{politiciandata.contactnumber || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaMapMarkerAlt /> Voting Constituency</label>
              <span>{politiciandata.constituency || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaTag /> Portfolio Category</label>
              <span>{politiciandata.category || 'N/A'}</span>
            </div>
            <div className="politician-profile-detail-item">
              <label><FaBuilding /> Political Party</label>
              <span>{politiciandata.party || 'N/A'}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="profile-details">
          <p>No politician data available</p>
        </div>
      )}
      <div className="politician-edit-button-container">
        <button className="politician-edit-button" onClick={editprofile}>Edit Profile</button>
        <button className="politician-edit-button" onClick={changepassword}>Change Password</button>
      </div>
    </div>
  );
}