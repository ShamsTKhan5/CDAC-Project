import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddTheaterForm from './AddTheaterForm';
import AddMovieForm from './AddMovieForm';
import AddShowtimeForm from './AddShowtimeForm'; // Import the AddShowtimeForm component

function WelcomeAdmin() {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleAddTheaterClick = () => {
    navigate('/theaters/add-theater');
  };

  const handleAddMovieClick = () => {
    navigate('/movies/add-movie');
  };

  const handleAddShowtimeClick = () => {
    navigate('/showtimes/add-showtime'); // Navigate to the "Add Showtime" page
  };

  return (
    <div>
      <h2>Welcome, Admin {username}</h2>
      <button onClick={handleAddTheaterClick}>Add Theater</button>
      <button onClick={handleAddMovieClick}>Add Movie</button>
      <button onClick={handleAddShowtimeClick}>Add Showtime</button> {/* Add Showtime button */}
      <AddTheaterForm />
      <AddMovieForm />
      <AddShowtimeForm /> {/* Render the AddShowtimeForm */}
    </div>
  );
}

export default WelcomeAdmin;
