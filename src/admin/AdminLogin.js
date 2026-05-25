import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../main/config';
import Cookies from 'js-cookie';
import { 
  FaUserShield, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowLeft, 
  FaShieldAlt, 
  FaServer 
} from 'react-icons/fa';

export default function AdminLogin({ onAdminLogin }) {
  const navigate = useNavigate();  
  const [formdata, setFormData] = useState({
    username: '',
    password: ''
  });
 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/checkadminlogin?username=${formdata.username}&password=${formdata.password}`);
      
      if (response.data && response.data !== "Failed") {
        onAdminLogin();
        // Save the JWT token in cookies
        Cookies.set('admintoken', response.data, { expires: 1 });
        // Save basic admin info in localStorage for UI purposes
        localStorage.setItem('admin', JSON.stringify({ username: formdata.username, role: 'ROLE_ADMIN' }));
        navigate("/admindashboard");
      } else {
        setMessage("Login Failed: Invalid credentials");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <div className='admin-login-page'>
      {/* Left Side - Hero Section */}
      <div className='login-hero admin-hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>Centralized Command & Governance</h1>
          <p className='hero-description'>
            Secure administrative access gateway for Andhra Pradesh citizen grievance management. Monitor state metrics, approve profiles, and oversee public system configurations.
          </p>
          
          <div className='features-list'>
            <div className='feature-box'>
              <div className='feature-icon'>
                <FaServer />
              </div>
              <div>
                <h3>System Oversight</h3>
                <p>Manage database entries, verify registrations, and maintain operational stability.</p>
              </div>
            </div>
            <div className='feature-box'>
              <div className='feature-icon'>
                <FaShieldAlt />
              </div>
              <div>
                <h3>Audit Log Security</h3>
                <p>All admin interactions are strictly monitored and logged for security compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='login-form-container'>
        <div className='login-card'>
          <div className='login-header'>
            <Link to="/" className="back-home-btn">
              <FaArrowLeft /> Back to Home
            </Link>
            <h2>Admin Portal</h2>
            <p>Please enter administrative credentials to access command console.</p>
          </div>

          {message && <div className='success-message'>{message}</div>}
          {error && <div className='error-message'>{error}</div>}

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Username / Email</label>
              <div className='input-wrapper'>
                <FaUserShield className='input-icon' />
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter administrative username" 
                  value={formdata.username} 
                  onChange={change} 
                  required 
                />
              </div>
            </div>

            <div className='form-group'>
              <div className='password-header'>
                <label htmlFor='password'>Secure Key / Password</label>
                <a href="#" className='forgot-password'>Forgot Key?</a>
              </div>
              <div className='input-wrapper'>
                <FaLock className='input-icon' />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  placeholder="Enter admin password" 
                  value={formdata.password} 
                  onChange={change} 
                  required 
                />
                <button 
                  type='button'
                  className='toggle-password'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="button-group" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button className='login-btn' type="submit" style={{ flex: 2 }}>
                Authorize Access
              </button>
              <button 
                className='clear-btn' 
                type="button" 
                onClick={() => setFormData({ username: '', password: '' })}
                style={{ flex: 1 }}
              >
                Clear
              </button>
            </div>
          </form>

          <div className='divider'>
            <span>OR</span>
          </div>

          <button type='button' onClick={() => navigate('/politician')} className='representative-btn'>
            👤 Representative Login
          </button>
        </div>
      </div>
    </div>
  );
}

