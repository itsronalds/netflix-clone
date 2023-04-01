import { useState, useEffect } from 'react';
import logo from './../assets/logo.png';
import avatar from './../assets/avatar.png';

const Navbar = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => window.removeEventListener('scroll');
  }, []);

  return (
    <div className={`navbar ${show && 'navbar__black'}`}>
      <img className="navbar__logo" src={logo} alt="Netflix Logo" />
      <img
        className="navbar__avatar"
        src={avatar}
        alt="Netflix Avatar"
      />
    </div>
  );
};

export default Navbar;
