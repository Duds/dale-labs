// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          {/* Add your footer links here */}
        </ul>
      </nav>
      <div>
        <p>© 2023 CriticalView360. All rights reserved.</p>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;
