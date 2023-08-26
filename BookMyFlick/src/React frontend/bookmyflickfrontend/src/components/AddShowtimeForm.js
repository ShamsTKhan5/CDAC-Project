import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import theaterService from '../services/theaterService';
import movieService from '../services/movieService';
import showtimeService from '../services/showtimeService';

function AddShowtimeForm() {
  const [formData, setFormData] = useState({
    movie: '', // Initially empty
    theater: '', // Initially empty
    startTime: '',
    endTime: '',
  });

  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    movieService
      .getAllMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Movie fetch error:', error);
      });

    theaterService
      .getAllTheaters()
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch theaters. Please try again later.');
        console.error('Theater fetch error:', error);
      });
  }, []);

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

    showtimeService
      .addShowtime(formData)
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage('Showtime added successfully!');
          setFormData({
            movie: '', // Clear movie
            theater: '', // Clear theater
            startTime: '',
            endTime: '',
          });
        } else {
          setError('Showtime addition failed. Please try again later.');
          console.error('Showtime addition failed:', response.data.message);
        }
      })
      .catch((error) => {
        setError('Showtime addition failed. Please try again later.');
        console.error('Showtime addition error:', error);
      });
  };

  return (
    <div>
      <h2>Add Showtime</h2>
      <form onSubmit={handleSubmit}>
        <Select
          label="Select Movie"
          name="movie"
          value={formData.movie}
          onChange={handleChange}
          fullWidth
          required
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.title}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Select Theater"
          name="theater"
          value={formData.theater}
          onChange={handleChange}
          fullWidth
          required
        >
          {theaters.map((theater) => (
            <MenuItem key={theater.id} value={theater.id}>
              {theater.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="End Time"
          name="endTime"
          type="datetime-local"
          value={formData.endTime}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Showtime
        </Button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}

export default AddShowtimeForm;
