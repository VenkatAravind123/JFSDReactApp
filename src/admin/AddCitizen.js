import React, { useState } from 'react';
import './admin.css'
import axios from 'axios';
import config from '../main/config';

export default function AddCitizen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    aadhaarnumber: '',
    contactnumber: '',
    password: '',
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/addcitizen`, formData);
      if (response.status === 200) {
        setMessage(response.data.message || 'Registration successful!');
        setFormData({
          name: '',
          email: '',
          dateofbirth: '',
          gender: '',
          aadhaarnumber: '',
          contactnumber: '',
          password: '',
        });
      }
    } catch (error) {
      console.error(error.message);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="add-citizen-container">
      <h2>Add Citizen</h2>
      <form className="add-citizen-form" onSubmit={handleSubmit}>
        {message && <p className="success-message">{message}</p>}
        
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="Enter Citizen name" 
        />


        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          placeholder="Enter Email Address" 
        />
        <label>Date Of Birth</label>
        <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            required
          />
          <div className="radio-group">
            <input
              type="radio"
              id="male"
              name="gender"
              value="MALE"
              checked={formData.gender === 'MALE'}
              onChange={handleChange}
              required
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="FEMALE"
              checked={formData.gender === 'FEMALE'}
              onChange={handleChange}
              required
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="others"
              name="gender"
              value="OTHERS"
              checked={formData.gender === 'OTHERS'}
              onChange={handleChange}
              required
            />
            <label htmlFor="others">Others</label>
          </div>
          <label>Aadhaar Number</label>
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            name="aadhaarnumber"
            value={formData.aadhaarnumber}
            onChange={handleChange}
            required
          />
        <label>Phone number</label>
        <input 
          type="text" 
          name="contactnumber" 
          value={formData.contactnumber} 
          onChange={handleChange} 
          required 
          placeholder="Enter phone number" 
        />

        <label>Password</label>
        <input 
        type='password'
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          placeholder="Enter Password" 
        ></input>

        <button type="submit" className="submit-button">Add Citizen</button>
      </form>
    </div>
  );
}
