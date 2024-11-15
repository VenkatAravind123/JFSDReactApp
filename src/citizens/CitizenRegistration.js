import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './citizen.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CitizenRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    aadhaarnumber: '',
    contactnumber: '',
    password: '',
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2021/citizen/addcitizen', formData);
      if (response.status === 200) {
        toast.success('Registration successful! Redirecting to login...', {
          position: "top-center",
          autoClose: 3000
        });
        setFormData({
          name: '',
          email: '',
          dateofbirth: '',
          gender: '',
          aadhaarnumber: '',
          contactnumber: '',
          password: '',
        });

        setTimeout(() => {
          navigate('/citizen');
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.', {
        position: "top-center",
        autoClose: 3000
      });
      console.error('Registration error:', error);
    
    }
  };
  

  return (
    <div className="registration-container">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h2>CITIZEN REGISTRATION</h2>
      <p>Register now to become a member of the Society.</p>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateofbirth"
          placeholder="Date of Birth"
          value={formData.dateofbirth}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="text"
          name="aadhaarnumber"
          placeholder="Aadhaar Number"
          value={formData.aadhaarnumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactnumber"
          placeholder="+91 - Contact Number"
          value={formData.contactnumber}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit"><b>Register</b></button>
      </form>
      <p>Already a member? <Link to="/citizen">Login Here</Link></p>
    </div>
  );
}