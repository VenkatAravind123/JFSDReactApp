import React, { useState } from 'react';
import './admin.css'
import axios from 'axios';
import config from '../main/config';

export default function AddPolitician() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    category: '',
    party: '',
    contactnumber:'',
    password: 'politician@123',
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/addpolitician`, formData);
      if (response.status === 200) {
        setMessage(response.data.message || 'Registration successful!');
        setFormData({
            name: '',
            email: '',
            dateofbirth: '',
            gender: '',
            category: '',
            party: '',
            password: 'politician@123',
        });
      }
    } catch (error) {
      console.error(error.message);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="add-citizen-container">
      <h2>Add Politician</h2>
      <form className="add-citizen-form" onSubmit={handleSubmit}>
        {message && <p className="success-message">{message}</p>}
        
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="Enter Politician name" 
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
          <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="MP">MP</option>
          <option value="MLA">MLA</option>
          
        </select>

        <label>Party Name</label>
        <input
          type="text"
          name="party"
          value={formData.party}
          onChange={handleChange}
          required
          placeholder="Enter Party Name"
        />
        <label>Contact Number</label>
        <input
          type="text"
          name="contactnumber"
          value={formData.contactnumber}
          onChange={handleChange}
          required
          placeholder="Enter Contact Number"
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

        <button type="submit" className="submit-button">Add Politician</button>
      </form>
    </div>
  );
}
