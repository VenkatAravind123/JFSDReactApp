import React, { useState } from 'react'
import './politician.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../main/config';

export default function PoliticianLogin({onPoliticianLogin}) {
  const navigate = useNavigate();  
  const [formdata, setFormData] = useState({
    email: "",
    password: ""
  }) 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [requestOTP, setRequestOTP] = useState(false);

  const change = (e) => {
    setFormData({...formdata, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/politician/checkpoliticianlogin?email=${formdata.email}&pwd=${formdata.password}`);
      if (response.data) {
        onPoliticianLogin();
        localStorage.setItem('politician', JSON.stringify(response.data));
        navigate("/politiciandashboard");
      } else {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  }

  return (
    <div className='politician-login-page'>
      {/* Left Side - Hero Section */}
      <div className='login-hero politician-hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>Empowering Leadership, Serving People.</h1>
          <p className='hero-description'>
            Access the centralized command center for elected representatives. Manage constituency initiatives, track public proposals, and communicate with your citizens with transparency and efficiency.
          </p>
          
          <div className='features-list'>
            <div className='feature-box'>
              <div className='feature-icon'>
                <span className='material-symbols-outlined'>security</span>
              </div>
              <div>
                <h3>End-to-End Encrypted</h3>
                <p>Secure communication and data protection</p>
              </div>
            </div>
            <div className='feature-box'>
              <div className='feature-icon'>
                <span className='material-symbols-outlined'>domain</span>
              </div>
              <div>
                <h3>Institutional Access</h3>
                <p>Official administrative dashboard access</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='login-form-container'>
        <div className='login-card'>
          <div className='login-header'>
            <h2>Representative Login</h2>
            <p>Please authenticate to access your administrative dashboard.</p>
          </div>

          {message && <div className='success-message'>{message}</div>}
          {error && <div className='error-message'>{error}</div>}

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Email Address</label>
              <div className='input-wrapper'>
                
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email address" 
                  value={formdata.email} 
                  onChange={change} 
                  required
                />
              </div>
            </div>

            <div className='form-group'>
              <div className='password-header'>
                <label>Secure Password</label>
                <a href="#" className='forgot-password'>Forgot password?</a>
              </div>
              <div className='input-wrapper'>
               
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Enter your password" 
                  value={formdata.password} 
                  onChange={change} 
                  required
                />
                <button 
                  type='button'
                  className='toggle-password'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <label className='checkbox-label'>
              <input 
                type='checkbox'
                checked={requestOTP}
                onChange={(e) => setRequestOTP(e.target.checked)}
              />
              <span>Request secondary OTP on registered mobile</span>
            </label>

            <button type='submit' className='login-btn'>
              Login to Dashboard <span className='arrow'>→</span>
            </button>
          </form>

          {/* Security Warning */}
          <div className='security-warning'>
            <span className='warning-icon'>⚠️</span>
            <div>
              <h4>Strict Security Protocol</h4>
              <p>This system is for authorized representatives only. Unauthorized access attempts are logged and reported to the Civic Cyber-Security Division.</p>
            </div>
          </div>

          <div className='admin-contact'>
            Technical issues? <a href="#">Contact System Admin</a>
          </div>
        </div>
      </div>
    </div>
  )
}
