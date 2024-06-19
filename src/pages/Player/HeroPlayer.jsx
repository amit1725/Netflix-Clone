// HeroPlayer.jsx
import React from 'react';
import './HeroPlayer.css'; // Updated CSS import
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate } from 'react-router-dom';

const HeroPlayer = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-2); // Navigate back two steps
  };

  return (
    <div className='hero-player-container'>
      <img src={back_arrow_icon} alt="Back" className='hero-back-arrow' onClick={handleBackClick} />
      <iframe
        className='hero-player-iframe'
        src="https://www.youtube.com/embed/zhbn56EwRGM?si=sBhwNSNNsFsVlFR5"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="hero-player-info">
        <p>27 Mar 2019</p>
        <p>The Protector: Season 2</p>
        <p>Official Trailer</p>
      </div>
    </div>
  );
};

export default HeroPlayer;
