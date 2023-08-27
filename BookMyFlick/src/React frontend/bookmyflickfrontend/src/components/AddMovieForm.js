import React, { useState } from 'react';

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
        <table>
          <tbody>
            <tr>
              <td>
                <label>Title</label>
              </td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Genre</label>
              </td>
              <td>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Director</label>
              </td>
              <td>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Duration (minutes)</label>
              </td>
              <td>
                <input
                  type="number"
                  name="durationMinutes"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Release Date</label>
              </td>
              <td>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
              </td>
              <td>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Poster Image URL</label>
              </td>
              <td>
                <input
                  type="text"
                  name="posterImageUrl"
                  value={formData.posterImageUrl}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Add Movie</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
    </div>
  );
}

export default AddMovieForm;
