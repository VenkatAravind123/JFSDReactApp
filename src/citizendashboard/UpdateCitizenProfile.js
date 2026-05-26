import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';
import config from '../main/config';
import Cookies from 'js-cookie';

export default function UpdateCitizenProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    aadhaarnumber: '',
    contactnumber: '',
    constituency: '', // Assuming citizens have a constituency field
  });
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [message, setMessage] = useState('');
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
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('citizenToken');
        if (token) {
          const response = await axios.get(`${config.url}/citizen/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data;
          setFormData({
            id: data.id,
            name: data.name || '',
            email: data.email || '',
            dateofbirth: data.dateofbirth || '',
            gender: data.gender || '',
            aadhaarnumber: data.aadhaarnumber || '',
            contactnumber: data.contactnumber || '',
            constituency: data.constituency || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile for update:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('citizenToken');
      const response = await axios.put(`${config.url}/citizen/updatecitizenprofile/${formData.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        navigate('/citizendashboard/profile'); // Redirect to profile page
      }
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Citizen Profile</h2>
      <form className="update-profile-form" onSubmit={handleSubmit}>
        {message && <p className="success-message">{message}</p>}
        
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter your name"
            required 
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Enter email address"
            required 
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input 
            type="date" 
            name="dateofbirth" 
            value={formData.dateofbirth} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Aadhaar Number</label>
          <input 
            type="text" 
            name="aadhaarnumber" 
            value={formData.aadhaarnumber} 
            onChange={handleChange} 
            placeholder="12-digit Aadhaar number"
            required 
          />
        </div>

        <div className="form-group">
          <label>Contact Num ber</label>
          <input 
            type="text" 
            name="contactnumber" 
            value={formData.contactnumber} 
            onChange={handleChange} 
            placeholder="Enter phone number"
            required 
          />
        </div>

        <div className="form-group form-group-full">
          <label>Constituency</label>
          {/* <input 
            type="text" 
            name="constituency"                                                                  
            value={formData.constituency} 
            onChange={handleChange} 
            placeholder="Enter your voting constituency"
            required 
          /> */}
         <select
            name="constituency"
            value={formData.constituency}
            onChange={handleChange}
            required
          >
            <option value="">Select Constituency</option>
            {constituencies.map((constituency) => (
              <option key={constituency.id} value={constituency.name}>
                {constituency.name}
              </option>
            ))}
          </select>                                                                                                     
        </div>                                                                                                                  
                                                         
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
}