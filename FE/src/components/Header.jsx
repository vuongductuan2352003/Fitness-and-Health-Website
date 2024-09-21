import React from 'react';

// You can style it using CSS or inline styles

function Header() {
  
  return (
    <header className="header">
      <div className="logo">
        <a href="/">GymFit</a>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="cta">
        <a href="#join" className="cta-button">Join Now</a>
      </div>
    </header>
  );
}

export default Header;
