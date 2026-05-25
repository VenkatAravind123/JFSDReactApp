import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './config';
import { FaUser, FaEnvelope, FaTag, FaCommentAlt, FaArrowLeft } from 'react-icons/fa';
import '../styles/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/citizen/sendemail`, formData);
      if (response.data === "Email Sent Successfully") {
        toast.success('📧 Email Sent Successfully!', {
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
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error('❌ Failed to send email. Please try again.', {
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
    <div className="contact-us-page">
      <div className="contact-container">
        <ToastContainer />
        <div className="contact-header">
          <Link to="/" className="back-home-btn">
            <FaArrowLeft /> Back to Home
          </Link>
          <h2>Contact Us</h2>
          <p>Get in touch with our team for general administrative inquiries.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <div className="input-wrapper">
              <FaTag className="input-icon" />
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <div className="input-wrapper">
              <FaCommentAlt className="input-icon" style={{ top: '16px', transform: 'none' }} />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
              />
            </div>
          </div>

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
          
          <div className="signup-container">
            <span className="signup-text">
              Don't have an account?
              <Link to="/register">
                Register here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;