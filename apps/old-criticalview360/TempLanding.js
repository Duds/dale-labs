import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <main>
        <section>
          <h1>Hero Section</h1>
          <p>Some text about CriticalView360.</p>
          <Link to="/login">Go to Dashboard</Link>
        </section>

        <section>
          <h2>Latest Posts</h2>
          {/* Map over your posts data and render elements here */}
        </section>

        <section>
          <h2>Related Case Studies</h2>
          {/* Map over your case studies data and render elements here */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
