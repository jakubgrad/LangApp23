import React, { useState } from 'react';
import './TopNavbar.css';

const TopNavbar = () => {
  
  return (
    <nav className={`top-navbar`}>
      <ul>
        <li><a href = {`/frontend/book/HarryPotter`}>Main</a></li>
        <li><a href = {`/frontend/about`}>About</a></li>
        <li><a href = {`/frontend/upload`}>Upload</a></li>
        <li><a href = {`/frontend/contact`}>Contact</a></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default TopNavbar;
