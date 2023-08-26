import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}

export default Registration;
