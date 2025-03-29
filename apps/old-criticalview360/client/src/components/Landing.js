// Landing.js
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './Header'; // Import your Header component
import Footer from './Footer' // Import your Footer component

const Landing = () => {
  return (
    <div className='App'>
      <Header />

      <main>
        <section className="hero-section">
          <h1>Discover CriticalView360</h1>
          <p>Get insights into hazards and risk management using our powerful SaaS platform.</p>
          <Link to="/login" className="cta-button">Go to Dashboard</Link>
        </section>

        <section className="latest-posts">
          <h2>Latest Posts</h2>
          {/* Map over your posts data and render elements here */}
        </section>

        <section className="related-case-studies">
          <h2>Related Case Studies</h2>
          {/* Map over your case studies data and render elements here */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
