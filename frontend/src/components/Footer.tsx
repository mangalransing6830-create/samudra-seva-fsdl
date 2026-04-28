import { Link } from 'react-router-dom';
import { Waves, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-6 w-6 text-sky-400" />
              <span className="font-bold text-xl text-white">Samudra Seva</span>
            </div>
            <p className="text-slate-400 max-w-xs">
              Dedicated to preserving our beautiful coastlines through community action and monitoring.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/beaches" className="hover:text-sky-400 transition-colors">Beach Status</Link></li>
              <li><Link to="/map" className="hover:text-sky-400 transition-colors">Interactive Map</Link></li>
              <li><Link to="/events" className="hover:text-sky-400 transition-colors">Cleanup Events</Link></li>
              <li><Link to="/report" className="hover:text-sky-400 transition-colors">Report Garbage</Link></li>
              <li><Link to="/volunteers" className="hover:text-sky-400 transition-colors">Our Volunteers</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/join" className="hover:text-sky-400 transition-colors font-bold text-sky-400">Join the Movement</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-400" /> Mumbai, India</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-sky-400" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-sky-400" /> hello@samudraseva.org</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Samudra Seva. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
