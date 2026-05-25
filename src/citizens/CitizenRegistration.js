import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './citizen.css';
import config from '../main/config';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaGenderless, 
  FaIdCard, 
  FaPhone, 
  FaLock, 
  FaMapMarkerAlt, 
  FaEye, 
  FaEyeSlash,
  FaArrowLeft
} from 'react-icons/fa';

function CitizenRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    gender: '',
    aadhaarnumber: '',
    contactnumber: '',
    password: '',
    constituency: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // Update the validation functions with more descriptive checks
const validateName = (name) => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name should only contain letters';
  return '';
};

const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address';
  return '';
};

const validateDateOfBirth = (dateofbirth) => {
  if (!dateofbirth) return 'Date of birth is required';
  const today = new Date();
  const dob = new Date(dateofbirth);
  const age = today.getFullYear() - dob.getFullYear();
  if (age < 18) return 'You must be at least 18 years old';
  if (dob >= today) return 'Date of birth cannot be in the future';
  return '';
};

const validateAadhaarNumber = (aadhaarnumber) => {
  if (!aadhaarnumber) return 'Aadhaar number is required';
  if (!/^\d{12}$/.test(aadhaarnumber)) return 'Aadhaar number must be exactly 12 digits';
  return '';
};

const validateContactNumber = (contactnumber) => {
  if (!contactnumber) return 'Contact number is required';
  if (!/^\d{10}$/.test(contactnumber)) return 'Contact number must be exactly 10 digits';
  return '';
};

const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[!@#$%^&*]/.test(password)) return 'Password must contain at least one special character (!@#$%^&*)';
  return '';
};

const validateConstituency = (constituency) => {
  if (!constituency.trim()) return 'Constituency is required';
  if (constituency.trim().length < 3) return 'Constituency must be at least 3 characters';
  return '';
};

// Update handleChange to validate in real-time
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // Real-time validation
  let error = '';
  switch (name) {
    case 'name': error = validateName(value); break;
    case 'email': error = validateEmail(value); break;
    case 'dateofbirth': error = validateDateOfBirth(value); break;
    case 'aadhaarnumber': error = validateAadhaarNumber(value); break;
    case 'contactnumber': error = validateContactNumber(value); break;
    case 'password': error = validatePassword(value); break;
    case 'constituency': error = validateConstituency(value); break;
    default: break;
  }

  setErrors(prev => ({
    ...prev,
    [name]: error
  }));
};

// Update validateForm to use the new validation functions
const validateForm = () => {
  const newErrors = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    dateofbirth: validateDateOfBirth(formData.dateofbirth),
    aadhaarnumber: validateAadhaarNumber(formData.aadhaarnumber),
    contactnumber: validateContactNumber(formData.contactnumber),
    password: validatePassword(formData.password),
    constituency: validateConstituency(formData.constituency)
  };

  setErrors(newErrors);
  return !Object.values(newErrors).some(error => error !== '');
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${config.url}/citizen/addcitizen`, formData);
      
      if (response.status === 200) {
        // Send registration email
        await axios.post(`${config.url}/citizen/registrationemail`, {
          name: formData.name,
          email: formData.email
        });

        toast.success('🎉 Registration Successful!', {
          position: "top-center",
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
          dateofbirth: '',
          gender: '',
          aadhaarnumber: '',
          contactnumber: '',
          password: '',
          constituency: ''
        });

        setTimeout(() => {
          navigate('/citizen');
        }, 3000);
      }
    } catch (error) {
      toast.error('❌ Registration failed. Please try again.', {
        position: "top-center",
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
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="citizen-registration-page">
      <div className="registration-container">
        <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="registration-header">
          <Link to="/" className="back-home-btn">
            <FaArrowLeft /> Back to Home
          </Link>
          <h2>CITIZEN REGISTRATION</h2>
          <p>Register now to access secure government services and stay connected.</p>
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
                className={errors.name ? 'error' : ''}
              />
            </div>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <div className="input-wrapper">
              <FaCalendarAlt className="input-icon" />
              <input 
                type="date"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                required
                className={errors.dateofbirth ? 'error' : ''}
              />
            </div>
            {errors.dateofbirth && <span className="error-message">{errors.dateofbirth}</span>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="input-wrapper">
              <FaGenderless className="input-icon" style={{ fontSize: '20px' }} />
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>Aadhaar Number</label>
            <div className="input-wrapper">
              <FaIdCard className="input-icon" />
              <input 
                type="text"
                name="aadhaarnumber"
                value={formData.aadhaarnumber}
                onChange={handleChange}
                placeholder="Enter Aadhaar Number"
                required
                className={errors.aadhaarnumber ? 'error' : ''}
              />
            </div>
            {errors.aadhaarnumber && <span className="error-message">{errors.aadhaarnumber}</span>}
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <div className="input-wrapper">
              <FaPhone className="input-icon" />
              <input 
                type="text"
                name="contactnumber"
                value={formData.contactnumber}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                required
                className={errors.contactnumber ? 'error' : ''}
              />
            </div>
            {errors.contactnumber && <span className="error-message">{errors.contactnumber}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Constituency</label>
            <div className="input-wrapper">
              <FaMapMarkerAlt className="input-icon" />
              <input 
                type="text"
                name="constituency"
                value={formData.constituency}
                onChange={handleChange}
                placeholder="Enter Constituency"
                required
                className={errors.constituency ? 'error' : ''}
              />
            </div>
            {errors.constituency && <span className="error-message">{errors.constituency}</span>}
          </div>

          <button type="submit">Register</button>
        </form>
        <div className="register-link">
          Already have an account?{' '}
          <Link to="/citizen">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default CitizenRegistration;