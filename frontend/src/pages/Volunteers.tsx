import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Calendar, Users } from 'lucide-react';

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  joinedAt: string;
}

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/volunteers')
      .then(res => setVolunteers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const avatarColors = [
    'bg-sky-100 text-sky-700',
    'bg-emerald-100 text-emerald-700',
    'bg-violet-100 text-violet-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Volunteers</h1>
          <p className="text-slate-600">Meet the heroes keeping our beaches clean.</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <Users className="h-6 w-6 text-sky-600" />
          <div>
            <p className="text-xs text-sky-600 font-medium uppercase tracking-wide">Total Volunteers</p>
            <p className="text-2xl font-bold text-sky-900">{volunteers.length}</p>
          </div>
        </div>
      </div>

      {volunteers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-200">
          <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-900 mb-2">No Volunteers Yet</h3>
          <p className="text-slate-500">Be the first to <a href="/join" className="text-sky-600 underline">join the movement!</a></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map((volunteer, index) => (
            <div key={volunteer._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                  {volunteer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{volunteer.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {new Date(volunteer.joinedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-sky-500 shrink-0" />
                  <span className="truncate">{volunteer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-sky-500 shrink-0" />
                  <span>{volunteer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-500 shrink-0" />
                  <span>{volunteer.location}</span>
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-slate-100">
                <span className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {volunteer.availability}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Volunteers;
