import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import './CategoryResults.css';

const apiKey =import.meta.env.VITE_API_KEY;

const CategoryResults = () => {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      let url = '';
      switch (categoryName) {
        case 'tv-shows':
          url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
          break;
        case 'movies':
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
          break;
        case 'new-popular':
          url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
          break;
        case 'my-list':
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`;
          break;
        case 'browse':
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;
          break;
        default:
          break;
      }

      if (url) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched data:', data);
          setResults(data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchCategory();
  }, [categoryName]);

  const handleCardClick = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="category-results">
      <img src={back_arrow_icon} className="back" alt="Back" onClick={() => navigate('/')} />
      <h2>{categoryName ? categoryName.replace(/-/g, ' ') : 'Category'}</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map(item => (
            <div key={item.id} className="result-item" onClick={() => handleCardClick(item.id)}>
              <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
              <p>{item.title || item.name}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryResults;
