import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'; // Import the specific loader
import './Politician.css';
import config from '../main/config';

function OtpVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${config.url}/politician/sendotp`, { email });
      if (response.data.otp) {
        setGeneratedOtp(response.data.otp);
        setIsOtpSent(true);
        toast.success('OTP sent to your email!', {
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
      }
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.', {
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

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsLoading(true);
      setTimeout(() => {
        navigate('/politiciandashboard/changepassword', { state: { email } });
      }, 2000); // Simulate a delay for the loader
    } else {
      toast.error('Invalid OTP. Please try again.', {
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
    <div className="politician-security-card-container">
      <ToastContainer />
      <h2>OTP Verification</h2>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
          <ThreeDots color="var(--primary)" height={60} width={60} />
        </div>
      ) : (
        !isOtpSent ? (
          <div className="politician-security-form">
            <p className="subtitle">We will send a one-time verification code to your registered email address.</p>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="politician-security-input"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              required
            />
            <button onClick={sendOtp} className="politician-security-button">Send Verification OTP</button>
          </div>
        ) : (
          <div className="politician-security-form">
            <p className="subtitle">Please enter the 6-digit OTP code sent to <strong>{email}</strong>.</p>
            <label htmlFor="otp">Enter OTP Code</label>
            <input
              id="otp"
              type="text"
              className="politician-security-input"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit code"
              required
            />
            <button onClick={verifyOtp} className="politician-security-button">Verify &amp; Continue</button>
          </div>
        )
      )}
    </div>
  );
}

export default OtpVerification;