import React, { useEffect, useState } from 'react'
import '../citizendashboard/SideBar.css'
import axios from 'axios';

function Reports() {
  const [formData, setFormData] = useState({
    description: '',
    image_url: '',
  });
const [citizendata,setCitizenData] = useState("")
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const storedCitizenData = localStorage.getItem('citizen');
    
    if (storedCitizenData) {
      const parsedCitizenData = JSON.parse(storedCitizenData);
      setCitizenData(parsedCitizenData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citizenId = citizendata.id;
      const response = await axios.post(`http://localhost:2021/citizen/${citizenId}/issues`, formData);
      console.log(response.data)
      if (response.status === 200) {
        setMessage(response.data.message || 'Issue Created successful!');
        setFormData({
            description: '',
            image_url: '',
            
        });
      }
    } catch (error) {
      console.error(error.message);
      setMessage('Issue Creation failed. Please try again.');
    }
  };

  return (
    <div className="add-citizen-container">
      <h2>Add Issue</h2>
      <form className="add-citizen-form" onSubmit={handleSubmit}>
        {message && <p className="success-message">{message}</p>}
        
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
       

        <button type="submit" className="submit-button">Add Citizen</button>
      </form>
    </div>
  );
}

export default Reports;
