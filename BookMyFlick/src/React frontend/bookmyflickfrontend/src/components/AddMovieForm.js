import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import the movie service
import movieService from '../services/movieService';

function AddMovieForm() {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    director: '',
    durationMinutes: '',
    releaseDate: '',
    description: '',
    posterImageUrl: '',
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

    // Use the movieService to add a movie
    movieService
      .addMovie(formData)
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage('Movie added successfully!');
          setFormData({
            title: '',
            genre: '',
            director: '',
            durationMinutes: '',
            releaseDate: '',
            description: '',
            posterImageUrl: '',
          });
        } else {
          setError('Movie addition failed. Please try again later.');
          console.error('Movie addition failed:', response.data.message);
        }
      })
      .catch((error) => {
        setError('Movie addition failed. Please try again later.');
        console.error('Movie addition error:', error);
      });
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Director"
          name="director"
          value={formData.director}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Duration (minutes)"
          name="durationMinutes"
          type="number"
          value={formData.durationMinutes}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Poster Image URL"
          name="posterImageUrl"
          value={formData.posterImageUrl}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Movie
        </Button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
}

export default AddMovieForm;
