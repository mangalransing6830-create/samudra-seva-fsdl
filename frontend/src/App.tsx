import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Beaches from './pages/Beaches';
import BeachMap from './pages/Map';
import Events from './pages/Events';
import Report from './pages/Report';
import Join from './pages/Join';
import Volunteers from './pages/Volunteers';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/beaches" element={<Beaches />} />
            <Route path="/map" element={<BeachMap />} />
            <Route path="/events" element={<Events />} />
            <Route path="/report" element={<Report />} />
            <Route path="/join" element={<Join />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
