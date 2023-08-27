import React, { useState } from 'react';
import registerUser from '../services/registrationService';

function Registration() {
  const initialFormData = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const inputStyle = {
    marginBottom: '10px', 
    width: '100%', 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    // Perform client-side validation (e.g., check for empty fields)
    if (!formData.username || !formData.password || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }

    registerUser(formData)
      .then((response) => {
        if (response.status === 201) {
          console.log('Registration successful!', response.data);

          setSuccessMessage('Registration successful!');
          setFormData(initialFormData); // Clear the form
        } else {
          setError('Registration failed. Please try again later.');
          console.error('Registration failed:', response.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
          console.error('Registration error:', error.response.data);
        } else {
          setError('Registration failed. Please try again later.');
          console.error('Registration failed:', error);
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle} 
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle} 
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle} 
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle} 
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle} 
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle} 
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}

export default Registration;
