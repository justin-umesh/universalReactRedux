import React from 'react';
import { Link } from 'react-router-dom';
import s from './header.css';
// import Header from '../Header';
// import Feedback from '../Feedback';
// import Footer from '../Footer';

const Header = () => (
  <div className={s.root}>
    <nav>
      <div className="nav-wrapper">
        <Link to="/" href="/" className="brand-logo">
          React SSR
        </Link>
      </div>
      <div className="nav-wrapper">
        <Link to="/product" href="/product" className="brand-logo">
          React SSR
        </Link>
      </div>
    </nav>
  </div>);
export default Header;
