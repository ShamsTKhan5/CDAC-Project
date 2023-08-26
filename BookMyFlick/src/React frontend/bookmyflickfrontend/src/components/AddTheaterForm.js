import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import the theaterService
import theaterService from '../services/theaterService';

function AddTheaterForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    facilities: '',
  });

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

    // Use the theaterService to add a theater
    theaterService
      .addTheater(formData)
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage('Theater added successfully!');
          setFormData({
            name: '',
            location: '',
            capacity: '',
            facilities: '',
          });
        } else {
          setError('Theater addition failed. Please try again later.');
          console.error('Theater addition failed:', response.data.message);
        }
      })
      .catch((error) => {
        setError('Theater addition failed. Please try again later.');
        console.error('Theater addition error:', error);
      });
  };

  return (
    <div>
      <h2>Add Theater</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Capacity"
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Facilities"
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Theater
        </Button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}

export default AddTheaterForm;
