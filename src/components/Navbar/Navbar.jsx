import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_icon from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // State for toggling the menu

  const handleSearchClick = () => {
    navigate('/search-movie'); // Navigate to the search page
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='navbar' ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        {/* Hamburger Menu Icon */}
        <div className="hamburger-menu" onClick={handleToggleMenu}>
          <div className={`bar ${showMenu ? 'active' : ''}`}></div>
          <div className={`bar ${showMenu ? 'active' : ''}`}></div>
          <div className={`bar ${showMenu ? 'active' : ''}`}></div>
        </div>
        {/* Navigation Links */}
        <ul className={showMenu ? "active" : ""}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/category/tv-shows">TV Shows</Link></li>
          <li><Link to="/category/movies">Movies</Link></li>
          <li><Link to="/category/new-popular">New & Popular</Link></li>
          <li><Link to="/category/my-list">My List</Link></li>
          <li><Link to="/category/browse">Browse</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className='icons' onClick={handleSearchClick}/>
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className='icons' />
        <div className="navbar-profile">
          <img src={profile_icon} alt="Profile" className='profile' />
          <img src={caret_icon} alt="Caret Icon" />
          <div className="dropdown">
            <p onClick={logout}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
