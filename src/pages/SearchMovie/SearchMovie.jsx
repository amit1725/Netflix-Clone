import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './SearchMovie.css';
import Navbar from '../../components/Navbar/Navbar';
import { toast } from 'react-toastify';

const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // Hook to access navigation

  const handleSearch = async (e) => {
    e.preventDefault();

    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      toast.error('Error fetching data:', error);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/player/${id}`); // Navigate to Player component with movie ID
  };

  return (
    <>
      <Navbar/>
      <div className={`search-page ${results.length > 0 ? 'results-displayed' : ''}`}>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for a movie..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>
        <div className="search-results">
          {results.map((movie) => (
            <div key={movie.id} className="search-result" onClick={() => handleResultClick(movie.id)}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchMovie;
