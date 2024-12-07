import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';
import config from '../main/config';

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
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCitizenData = localStorage.getItem('citizen');
    if (storedCitizenData) {
      const parsedCitizenData = JSON.parse(storedCitizenData);
      setFormData(parsedCitizenData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/citizen/updatecitizenprofile/${formData.id}`, formData);
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        localStorage.setItem('citizen', JSON.stringify(formData)); // Update local storage
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
        
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Date of Birth</label>
        <input 
          type="date" 
          name="dateofbirth" 
          value={formData.dateofbirth} 
          onChange={handleChange} 
          required 
        />

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

        <label>Aadhaar Number</label>
        <input 
          type="text" 
          name="aadhaarnumber" 
          value={formData.aadhaarnumber} 
          onChange={handleChange} 
          required 
        />

        <label>Contact Number</label>
        <input 
          type="text" 
          name="contactnumber" 
          value={formData.contactnumber} 
          onChange={handleChange} 
          required 
        />

        <label>Constituency</label>
        <input 
          type="text" 
          name="constituency" 
          value={formData.constituency} 
          onChange={handleChange} 
          required 
        />

        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
}