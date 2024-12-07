import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Schemes.css';

export default function PoliticianSchemes() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    eligibilityCriteria: '',
    benefits: ''
  });
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await axios.get('http://localhost:2021/politician/viewschemes');
      setSchemes(response.data);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2021/politician/insertscheme', formData);
      if (response.status === 200) {
        toast.success('Scheme added successfully!');
        setFormData({
          name: '',
          description: '',
          deadline: '',
          eligibilityCriteria: '',
          benefits: ''
        });
        fetchSchemes(); // Refresh schemes list
      }
    } catch (error) {
      toast.error('Failed to add scheme. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="scheme-container">
      <ToastContainer />
      <h1>Government Schemes Management</h1>
      
      {/* Add Scheme Form */}
      <h2>Add New Scheme</h2>
      <form onSubmit={handleSubmit} className="scheme-form">
      <div className="form-group">
          <label>Scheme Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter scheme name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter scheme description"
          />
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Eligibility Criteria</label>
          <textarea
            name="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleChange}
            required
            placeholder="Enter eligibility criteria"
          />
        </div>

        <div className="form-group">
          <label>Benefits</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            required
            placeholder="Enter scheme benefits"
          />
        </div>

        <button type="submit" className="submit-btn">Add Scheme</button>
      </form>

      {/* Schemes Table */}
      <h2>All Schemes</h2>
      <div className="schemes-table-container">
        <table className="schemes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Eligibility Criteria</th>
              <th>Benefits</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme.id}>
                <td>{scheme.name}</td>
                <td>{scheme.description}</td>
                <td>{formatDate(scheme.deadline)}</td>
                <td>{scheme.eligibilityCriteria}</td>
                <td>{scheme.benefits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}