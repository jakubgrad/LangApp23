import React, { useState, useEffect } from 'react';
import './TopNavbar.css';

const TopNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowNavbar(scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`top-navbar ${showNavbar ? '' : 'hidden'}`}>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default TopNavbar;
