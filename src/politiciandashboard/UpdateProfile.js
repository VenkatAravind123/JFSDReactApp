import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Politician.css';
import config from '../main/config';
import Cookies from 'js-cookie';

export default function UpdateProfile() {
  const [politiciandata, setPoliticianData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    contactnumber: '',
    constituency: '', // Assuming politicians have a constituency field
  });

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
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = Cookies.get('politiciantoken');
        
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          
          // Fetch full profile from the backend to ensure all fields are populated
          const response = await axios.get(`${config.url}/admin/displaypoliticianbyid?id=${payload.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Ensure no null values are passed to controlled inputs
          const safeData = {
            id: response.data.id,
            name: response.data.name || '',
            email: response.data.email || '',
            dateofbirth: response.data.dateofbirth || '',
            gender: response.data.gender || '',
            contactnumber: response.data.contactnumber || '',
            constituency: response.data.constituency || '',
            category: response.data.category || '',
            party: response.data.party || ''
          };
          
          setPoliticianData(safeData);
        }
      } catch (error) {
        console.error('Error fetching profile data for update:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setPoliticianData({ ...politiciandata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('politiciantoken');
      const response = await axios.put(`${config.url}/politician/updatepoliticianprofile/${politiciandata.id}`, politiciandata, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
      }
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="politician-update-profile-container">
      <h2>Update Politician Profile</h2>
      <form className="politician-update-profile-form" onSubmit={handleSubmit}>
        {message && <p className="politician-success-message">{message}</p>}
        
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={politiciandata.name || ''} 
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
            value={politiciandata.email || ''} 
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
            value={politiciandata.dateofbirth || ''} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select 
            name="gender" 
            value={politiciandata.gender || ''} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input 
            type="text" 
            name="contactnumber" 
            value={politiciandata.contactnumber || ''} 
            onChange={handleChange} 
            placeholder="Enter contact number"
            required 
          />
        </div>

        <div className="form-group form-group-full">
          <label>Voting Constituency</label>
          {/* <input 
            type="text" 
            name="constituency" 
            value={politiciandata.constituency || ''} 
            onChange={handleChange} 
            placeholder="Enter your voting constituency"
            required 
          /> */}
          <select
            name="constituency"
            value={politiciandata.constituency}
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

        <button type="submit" className="politician-submit-button">Update Profile</button>
      </form>
    </div>
  );
}