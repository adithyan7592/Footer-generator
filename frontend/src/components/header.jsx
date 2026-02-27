import React from 'react';
import Logo from '../assets/images.jpg'; // Path to your logo

const Header = () => {
  return (
    <header className="app-header">
      <img src={Logo} className="main-logo" alt="Kerala Paints Logo" />
    </header>
  );
};

export default Header;