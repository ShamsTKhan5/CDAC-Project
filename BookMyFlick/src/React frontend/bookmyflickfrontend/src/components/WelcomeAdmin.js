import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddTheaterForm from './AddTheaterForm';
import AddMovieForm from './AddMovieForm';
import AddShowtimeForm from './AddShowtimeForm';

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
    navigate('/showtimes/add-showtime');
  };

  return (
    <div>
      <h2>Welcome, Admin {username}</h2>
      <button onClick={handleAddTheaterClick}>Add Theater</button>
      <button onClick={handleAddMovieClick}>Add Movie</button>
      <button onClick={handleAddShowtimeClick}>Add Showtime</button>
      <div style={{ marginTop: '20px' }}> {}
        <AddTheaterForm />
      </div>
      <div style={{ marginTop: '20px' }}> {}
        <AddMovieForm />
      </div>
      <div style={{ marginTop: '20px' }}> {}
        <AddShowtimeForm />
      </div>
    </div>
  );
}

export default WelcomeAdmin;
