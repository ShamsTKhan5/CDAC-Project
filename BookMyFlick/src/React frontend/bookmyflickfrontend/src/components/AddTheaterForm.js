import React, { useState } from 'react';

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
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Location</label>
              </td>
              <td>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Capacity</label>
              </td>
              <td>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Facilities</label>
              </td>
              <td>
                <input
                  type="text"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" style={{ width: '30 px' }}>
          Add Theater
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
    </div>
  );
}

export default AddTheaterForm;
