import { Link } from 'react-router-dom';
import React from 'react';
import Logo from './Logo';

function Header() {
  return (
    <header className="navigation">
      <nav>
        <Logo />
        <ul className="nav-list right">
          <li className="nav-item"><Link to="/about">About us</Link></li>
          <li className="nav-item"><Link to="/counter">Counter</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
