import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from './config';

function ContactUs() {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '40px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '2rem',
      textAlign: 'center',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      position: 'relative',
      zIndex: 1
    },
    inputContainer: {
      position: 'relative',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      fontSize: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    textarea: {
      minHeight: '150px',
      resize: 'vertical',
      fontFamily: 'inherit',
      width: '100%',
      padding: '15px 20px',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      fontSize: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    submit: {
      background: isHovered 
        ? 'linear-gradient(45deg, #0097b2, #00c3ea)'
        : 'linear-gradient(45deg, #00c3ea, #0097b2)',
      color: 'white',
      padding: '16px 32px',
      border: 'none',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginTop: '20px',
      boxShadow: '0 10px 20px rgba(0, 195, 234, 0.2)',
      transform: isHovered ? 'translateY(-2px)' : 'none',
      width: '100%',
      maxWidth: '300px',
      alignSelf: 'center'
    },
    signupContainer: {
      textAlign: 'center',
      marginTop: '30px',
      padding: '20px',
      borderTop: '1px solid rgba(0,0,0,0.1)'
    },
    signupText: {
      color: '#666',
      fontSize: '1rem'
    },
    link: {
      color: '#00c3ea',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '8px',
      transition: 'color 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2 style={styles.heading}>Contact Us</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            style={styles.textarea}
          />
        </div>
        <button
          type="submit"
          style={styles.submit}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Send Message
        </button>
        <div style={styles.signupContainer}>
          <span style={styles.signupText}>
            No account?
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;