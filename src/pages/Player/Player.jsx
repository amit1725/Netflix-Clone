import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Player = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_AUTHORIZATION
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        } else {
          toast.error("No trailer found for this movie.");
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => window.history.back()} />
      {apiData.key && (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      )}
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
