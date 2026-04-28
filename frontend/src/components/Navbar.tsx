import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Waves className="h-8 w-8 text-sky-600" />
              <span className="font-bold text-xl text-sky-900">Samudra Seva</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Home</Link>
            <Link to="/beaches" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Beaches</Link>
            <Link to="/map" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Interactive Map</Link>
            <Link to="/events" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Events</Link>
            <Link to="/report" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Report Garbage</Link>
            <Link to="/volunteers" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Volunteers</Link>
            <Link to="/contact" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">Contact</Link>
            <Link to="/join" className="bg-sky-600 text-white px-4 py-2 rounded-md font-medium hover:bg-sky-700 transition-colors shadow-sm">
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
