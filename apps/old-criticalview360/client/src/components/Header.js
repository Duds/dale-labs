import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import auth from firebase
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import onAuthStateChanged and signOut from firebase/auth

const Header = () => { // Wrap your code inside a functional component
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      window.location.href = '/login';
    });
  };

  return (
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            {user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
  );
};

export default Header;
