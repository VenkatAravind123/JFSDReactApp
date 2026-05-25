import React, { useState } from 'react';
import './citizen.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../main/config';
import Cookies from 'js-cookie';

export default function CitizenLogin({ onCitizenLogin }) {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`${config.url}/citizen/checkcitizenlogin?email=${formdata.email}&pwd=${formdata.password}`);

  //     if (response.data) {
  //       onCitizenLogin();
  //       localStorage.setItem('citizen', JSON.stringify(response.data));
  //       navigate("/citizendashboard");
  //     } else {
  //       setMessage("Login Failed");
  //       setError("");
  //     }
  //   } catch (error) {
  //     setMessage("");
  //     setError(error.message);
  //   }
  // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed 'pwd' to 'password' to match the updated Spring Boot backend
      const response = await axios.post(`${config.url}/citizen/checkcitizenlogin?email=${formdata.email}&password=${formdata.password}`);

      const token = response.data;

      // The backend returns "Failed" if login is unsuccessful
      if (token && token !== "Failed") {
        
        // 1. Save the JWT Token in a cookie (expires in 1 day)
        Cookies.set('citizenToken', token, { expires: 1, secure: true, sameSite: 'Strict' });
        
        // 2. Call your login handler
        onCitizenLogin();
        
        // 3. Navigate to dashboard
        navigate("/citizendashboard");
        
      } else {
        setMessage("Login Failed: Invalid Credentials");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError("Server Error: " + error.message);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className='citizen-login-page'>
      {/* Left Side - Hero Section */}
      <div className='login-hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>Empowering every citizen of Andhra Pradesh.</h1>
          <p className='hero-description'>
            Access essential government services and bridge the gap between you and your leaders with a single secure portal.
          </p>

          <div className='features-list'>
            <div className='feature-box'>
              <span className='feature-icon'>📋</span>
              <div>
                <h3>Track your grievances</h3>
                <p>Real-time updates on your submitted issues and service requests.</p>
              </div>
            </div>

            <div className='feature-box'>
              <span className='feature-icon'>💬</span>
              <div>
                <h3>Direct contact with leaders</h3>
                <p>Communicate directly with local representatives for community development.</p>
              </div>
            </div>

            <div className='feature-box'>
              <span className='feature-icon'>🔔</span>
              <div>
                <h3>Stay informed</h3>
                <p>Receive alerts on government policies and local development news.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='login-form-container'>
        <div className='login-card'>
          <div className='login-header'>
            <h2>Citizen Login</h2>
            <p>Secure access to Jana SevaAP services.</p>
          </div>

          {message && <div className='success-message'>{message}</div>}
          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit} className='login-form'>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <div className='input-wrapper'>
                
                <input
                  type='email'
                  id='email'
                  placeholder='name@example.com'
                  value={formdata.email}
                  onChange={change}
                  required
                />
              </div>
            </div>

            <div className='form-group'>
              <div className='password-header'>
                <label htmlFor='password'>Password</label>
                <a href='#' className='forgot-password'>Forgot Password?</a>
              </div>
              <div className='input-wrapper'>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='••••••••'
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

            <button type='submit' className='login-btn'>
              Login as Citizen
              <span className='arrow'>→</span>
            </button>
          </form>

          <div className='divider'>
            <span>OR</span>
          </div>

          <button onClick={handleGoogleLogin} className='google-btn'>
            <span>🔍</span>
            Login with Google
          </button>

          <div className='register-link'>
            Don't have an account?{' '}
            <Link to='/register'>Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
