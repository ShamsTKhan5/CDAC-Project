import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/loginService'; // Import the login function

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    loginType: 'user',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      if (response.success) {
        setMessage(`Login successful as ${response.data.username}`);
        const redirectPath = `/welcome-${formData.loginType}/${response.data.username}`;
        navigate(redirectPath);
      } else {
        console.error('Authentication failed', response.error);
        setMessage('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Login Type:</label>
          <select
            name="loginType"
            value={formData.loginType}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Login;
