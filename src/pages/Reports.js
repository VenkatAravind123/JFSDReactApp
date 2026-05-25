import React, { useEffect, useState } from 'react';
import '../citizendashboard/SideBar.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../main/config';
import Cookies from 'js-cookie';

function Reports() {
  const [formData, setFormData] = useState({
    description: '',
    image_url: '',
    constituency: '',
  });
  const [citizendata, setCitizenData] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    try {
      const token = Cookies.get('citizenToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCitizenData({ id: payload.id });
      }
    } catch (e) {
      console.error("Failed to parse JWT in Reports", e);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citizenId = citizendata.id;
      const token = Cookies.get('citizenToken');
      
      console.log("Submitting issue for Citizen ID:", citizenId);
      console.log("Token being sent:", token);

      if (!token) {
        toast.error('❌ You are not logged in. Please log in again.');
        return;
      }
      
      const response = await axios.post(`${config.url}/citizen/${citizenId}/issues`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        toast.success('🎉 Issue Created Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: {
            backgroundColor: '#28a745',
            color: 'white'
          }
        });
        
        setFormData({
          description: '',
          image_url: '',
          constituency: '',
        });
      }
    } catch (error) {
      toast.error('❌ Issue Creation Failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: '#dc3545',
          color: 'white'
        }
      });
    }
  };

  return (
    <div className="add-citizen-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h2>Post Your Issue</h2>
      <form className="add-citizen-form" onSubmit={handleSubmit}>
        <label>Description</label>
        <input 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          placeholder="Enter Issue Description" 
        />

        <label>Image URL</label>
        <input 
          type="text" 
          name="image_url" 
          value={formData.image_url} 
          onChange={handleChange} 
          required 
          placeholder="Enter Image Link" 
        />
        
        <label>Constituency</label>
        <input 
          type="text" 
          name="constituency" 
          value={formData.constituency} 
          onChange={handleChange} 
          required 
          placeholder="Enter Constituency" 
        />

        <button type="submit" className="submit-button">Add Issue</button>
      </form>
    </div>
  );
}

export default Reports;