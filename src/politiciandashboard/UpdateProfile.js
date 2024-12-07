import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../citizendashboard/DashBoard';
import config from '../main/config';

export default function UpdateProfile() {
  const [politiciandata, setPoliticianData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    contactnumber: '',
    constituency: '', // Assuming politicians have a constituency field
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedPoliticianData = localStorage.getItem('politician');
    if (storedPoliticianData) {
      const parsedPoliticianData = JSON.parse(storedPoliticianData);
      setPoliticianData(parsedPoliticianData);
    }
  }, []);

  const handleChange = (e) => {
    setPoliticianData({ ...politiciandata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/politician/updatepoliticianprofile/${politiciandata.id}`, politiciandata);
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        localStorage.setItem('politician', JSON.stringify(politiciandata)); // Update local storage
      }
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Politician Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        {message && <p className="success-message">{message}</p>}
        
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={politiciandata.name} 
          onChange={handleChange} 
          required 
        />

        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={politiciandata.email} 
          onChange={handleChange} 
          required 
        />

        <label>Date of Birth</label>
        <input 
          type="date" 
          name="dateofbirth" 
          value={politiciandata.dateofbirth} 
          onChange={handleChange} 
          required 
        />

        <label>Gender</label>
        <select 
          name="gender" 
          value={politiciandata.gender} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <label>Contact Number</label>
        <input 
          type="text" 
          name="contactnumber" 
          value={politiciandata.contactnumber} 
          onChange={handleChange} 
          required 
        />

        <label>Constituency</label>
        <input 
          type="text" 
          name="constituency" 
          value={politiciandata.constituency} 
          onChange={handleChange} 
          required 
        />

        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
}