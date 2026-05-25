import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../main/config';
import Cookies from 'js-cookie';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  React.useEffect(() => {
    try {
      const token = Cookies.get('citizenToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setEmail(payload.sub);
      }
    } catch (e) {
      console.error("Failed to parse JWT in ChangePassword", e);
    }
  }, []);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/citizen/changepassword`, {
        email,
        newPassword
      });
      if (response.data === "Password changed successfully") {
        toast.success('Password changed successfully!', {
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
        setTimeout(() => {
          navigate('/citizendashboard');
        }, 3000);
      } else {
        toast.error('Failed to change password. Please try again.', {
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
    } catch (error) {
      toast.error('Failed to change password. Please try again.', {
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
    <div className="security-card-container">
      <ToastContainer />
      <h2>Change Password</h2>
      <p className="subtitle">Secure your account by choosing a strong password</p>
      <form onSubmit={handleSubmit} className="security-form">
        <label htmlFor="new-password">New Password</label>
        <input
          id="new-password"
          type="password"
          className="security-input"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter your new password"
          required
        />
        <button type="submit" className="security-button">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;