import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../main/config';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const storedCitizenData = JSON.parse(localStorage.getItem('citizen'));
  const email = storedCitizenData?.email;
  //console.log(email);

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
    <div style={styles.container}>
      <ToastContainer />
      <h2 style={styles.heading}>Change Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Change Password</button>
      </form>
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
  }
};

export default ChangePassword;