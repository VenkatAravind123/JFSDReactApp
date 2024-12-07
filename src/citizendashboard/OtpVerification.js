import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'; // Import the specific loader
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
      const response = await axios.post(`${config.url}/citizen/sendotp`, { email });
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
        navigate('/citizendashboard/changepassword', { state: { email } });
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
    <div style={styles.container}>
      <ToastContainer />
      <h2 style={styles.heading}>OTP Verification</h2>
      {isLoading ? (
        <div style={styles.loaderContainer}>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        !isOtpSent ? (
          <div style={styles.form}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
            <button onClick={sendOtp} style={styles.button}>Send OTP</button>
          </div>
        ) : (
          <div style={styles.form}>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              required
              style={styles.input}
            />
            <button onClick={verifyOtp} style={styles.button}>Verify OTP</button>
          </div>
        )
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#2c3e50'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    background: '#00c3ea',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px'
  }
};

export default OtpVerification;