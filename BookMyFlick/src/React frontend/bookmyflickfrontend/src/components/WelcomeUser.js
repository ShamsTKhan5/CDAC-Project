import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import showtimeService2 from '../services/showtimeService2';
import bookingService from '../services/bookingService';
import userService2 from '../services/userService2';

function WelcomeUser() {
  const { username } = useParams();

  const [data, setData] = useState({
    showtimes: [],
    selectedShowtime: null,
    currentUserId: null,
    loading: true,
    error: null,
  });

  // Fetch the showtimes
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const showtimeResponse = await showtimeService2.getAllShowtimes();
        setData((prevData) => ({
          ...prevData,
          showtimes: showtimeResponse.data,
          loading: false,
        }));
      } catch (error) {
        setData((prevData) => ({
          ...prevData,
          error: 'Showtimes fetch error',
          loading: false,
        }));
        console.error('Showtimes fetch error:', error);
      }
    };

    fetchShowtimes();
  }, []);

  // Fetch the user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await userService2.getUserIdByUsername(username);
        setData((prevData) => ({
          ...prevData,
          currentUserId: userId,
        }));
      } catch (error) {
        console.error('User ID fetch error:', error);
      }
    };

    fetchUserId();
  }, [username]);

  const handleSelectShowtime = (showtime) => {
    // Check if the showtime object contains movie and theater details
    if (showtime.movie && showtime.theater) {
      // Update the state with the selected showtime and its details
      setData((prevData) => ({
        ...prevData,
        selectedShowtime: showtime,
      }));
    } else {
      console.error('Movie or theater details are missing in the showtime object');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!data.selectedShowtime || !data.currentUserId) {
      console.error('Selected showtime or user ID is missing.');
      return;
    }

    // Prompt the user to enter a seat number
    const seatNumber = prompt('Enter a seat number:');
    if (!seatNumber) {
      console.log('Booking canceled by the user.');
      return;
    }

    const bookingData = {
      showtimeId: data.selectedShowtime.id,
      userId: data.currentUserId,
      bookingDatetime: new Date().toISOString(),
      seatNo: seatNumber, // Include the seat number in the booking data
    };

    console.log('Booking Data:', bookingData); // Debugging statement

    try {
      const response = await bookingService.addBooking(bookingData);
      console.log('Booking Response:', response); // Debugging statement

      if (response.status === 201) {
        console.log('Booking added successfully!');
        // Optionally, you can redirect the user to a confirmation page here.
      } else {
        console.error('Booking addition failed:', response.data.message);
      }
    } catch (error) {
      console.error('Booking addition error:', error);
    }
  };

  return (
    <div>
      <h2>Welcome, {username}</h2>
      {data.loading ? (
        <p>Loading...</p>
      ) : data.error ? (
        <p>Error: {data.error}</p>
      ) : (
        <div>
          <h3>Select a Showtime to Book:</h3>
          <ul>
            {data.showtimes.map((showtime) => (
              <li key={showtime.id}>
                <p>
                  Movie: {showtime.movie?.title || 'N/A'}<br />
                  Theater: {showtime.theater?.name || 'N/A'}<br />
                  Start Time: {showtime.startTime}
                </p>
                <Button onClick={() => handleSelectShowtime(showtime)}>Select</Button>
              </li>
            ))}
          </ul>

          {data.selectedShowtime && data.currentUserId && (
            <div>
              <h3>Selected Showtime Details:</h3>
              <p>
                Movie: {data.selectedShowtime.movie?.title || 'N/A'}<br />
                Theater: {data.selectedShowtime.theater?.name || 'N/A'}<br />
                Start Time: {data.selectedShowtime.startTime}
              </p>
              <h3>Booking Details:</h3>
              <form onSubmit={handleBookingSubmit}>
                <p>
                  Movie: {data.selectedShowtime.movie?.title || 'N/A'}<br />
                  Theater: {data.selectedShowtime.theater?.name || 'N/A'}<br />
                  Start Time: {data.selectedShowtime.startTime}
                </p>
                <Button type="submit" variant="contained" color="primary">
                  Book Now
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WelcomeUser;
