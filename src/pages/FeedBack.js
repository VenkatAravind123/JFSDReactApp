import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './feed.css';
import config from '../main/config';

function FeedBack() {
  const navigate = useNavigate();


  useEffect(() => {
    const citizenData = JSON.parse(localStorage.getItem('citizen'));
    if (citizenData) {
      setFormData(prevState => ({
        ...prevState,
        citizenname: citizenData.name,
        constituency: citizenData.constituency
      }));
    }
  }, []);

  const [formData, setFormData] = useState({
    citizenname: '',
    constituency: '',
    issue: '',
    rating: 0,
    suggestions: ''
  });

  const [hover, setHover] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${config.url}/citizen/submitfeedback`, formData);
  //     if (response.status === 200) {
  //       toast.success('Feedback submitted successfully!', {
  //         position: "top-center",
  //         autoClose: 3000
  //       });
  //       setFormData({
  //         citizenname: '',
  //         constituency: '',
  //         issue: '',
  //         rating: 0,
  //         suggestions: ''
  //       });
  //     }
  //   } catch (error) {
  //     toast.error('Failed to submit feedback. Please try again.', {
  //       position: "top-center",
  //       autoClose: 3000
  //     });
  //     console.error('Error submitting feedback:', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update URL to match your backend endpoint
      const response = await axios.post(`${config.url}/citizen/submitfeedback`, formData);
      
      if (response.status === 200) {
        toast.success('Feedback submitted successfully!', {
          position: "top-center",
          autoClose: 3000
        });
        
        // Clear form except name and constituency
        setFormData(prevState => ({
          ...prevState,
          issue: '',
          rating: 0,
          suggestions: ''
        }));
      }
    } catch (error) {
      let errorMessage = 'Failed to submit feedback. Please try again.';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'No response from server. Please try again later.';
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000
      });
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-container">
      <ToastContainer />
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-group">
      <label>Name:</label>
      <input
        type="text"
        name="citizenname"
        value={formData.citizenname}
        onChange={handleChange}
        required
        placeholder="Enter your name"
        readOnly
        className="readonly-input"
      />
    </div>

    <div className="form-group">
      <label>Constituency:</label>
      <input
        type="text"
        name="constituency"
        value={formData.constituency}
        onChange={handleChange}
        required
        placeholder="Enter your constituency"
        readOnly
        className="readonly-input"
      />
    </div>

        <div className="form-group">
          <label>Issue Description:</label>
          <textarea
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
            placeholder="Describe your issue"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setFormData(prev => ({ ...prev, rating: ratingValue }))}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover || formData.rating) ? "#ffc107" : "#e4e5e9"}
                    size={25}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label>Suggestions:</label>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            placeholder="Enter your suggestions"
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedBack;