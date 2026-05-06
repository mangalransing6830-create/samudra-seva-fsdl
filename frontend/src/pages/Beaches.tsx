import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, CheckCircle, Clock } from 'lucide-react';
import { socket } from '../socket';

interface Beach {
  _id: string;
  name: string;
  location: string;
  cleanlinessLevel: number;
  wasteLevel: string;
  description: string;
  updatedAt: string;
}

const Beaches = () => {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/beaches');
        setBeaches(response.data);
      } catch (error) {
        console.error('Error fetching beaches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeaches();

    socket.on('beach_updated', (updatedBeach: Beach) => {
      setBeaches((prevBeaches) => {
        const index = prevBeaches.findIndex((b) => b._id === updatedBeach._id);
        if (index !== -1) {
          const newBeaches = [...prevBeaches];
          newBeaches[index] = updatedBeach;
          return newBeaches;
        } else {
          return [updatedBeach, ...prevBeaches];
        }
      });
    });

    return () => {
      socket.off('beach_updated');
    };
  }, []);

  const getWasteLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'moderate': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getCleanlinessScoreColor = (score: number) => {
    if (score >= 4) return 'text-emerald-500';
    if (score >= 3) return 'text-amber-500';
    return 'text-rose-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Beach Status Dashboard</h1>
        <p className="text-slate-600">Real-time monitoring of coastal cleanliness</p>
      </div>

      {/* Leaderboard Section */}
      {beaches.length > 0 && (
        <div className="mb-16 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-sky-600 px-8 py-4 text-white flex items-center justify-between">
            <h2 className="text-xl font-bold">Cleanup Leaderboard — Cleanest Shores</h2>
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...beaches].sort((a, b) => (b.cleanlinessLevel || 0) - (a.cleanlinessLevel || 0)).slice(0, 3).map((beach, index) => (
                <div key={beach._id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : 'bg-amber-600'
                    }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{beach.name}</h3>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Score: {beach.cleanlinessLevel}/5</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {beaches.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-200">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-900 mb-2">No Reports Yet</h3>
          <p className="text-slate-500">All our monitored beaches seem to be doing great. Or maybe we need more reporters!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beaches.map((beach) => (
            <div key={beach._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{beach.name}</h3>
                    <p className="text-slate-500 flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" /> {beach.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getWasteLevelColor(beach.wasteLevel)}`}>
                    {beach.wasteLevel} Waste
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-medium">Cleanliness Score</span>
                    <span className={`font-bold ${getCleanlinessScoreColor(beach.cleanlinessLevel || 0)}`}>
                      {beach.cleanlinessLevel || 0}/5
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${(beach.cleanlinessLevel || 0) >= 4 ? 'bg-emerald-500' : (beach.cleanlinessLevel || 0) >= 3 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${((beach.cleanlinessLevel || 0) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {beach.description || "No additional details provided."}
                </p>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center text-xs text-slate-500">
                <Clock className="h-4 w-4 mr-1" />
                Updated {new Date(beach.updatedAt).toLocaleDateString()} at {new Date(beach.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Beaches;
