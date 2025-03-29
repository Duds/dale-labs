import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import './App.css';

import Landing from './components/Landing'; // Import your Landing component
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewCard from './components/NewCard';
import Review from './components/Review';
import Visualise from './components/Visualise';
import NotFound from './components/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* Use your Landing component here */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newCard" element={<NewCard />} />
        <Route path="/review" element={<Review />} />
        <Route path="/visualise" element={<Visualise />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;
