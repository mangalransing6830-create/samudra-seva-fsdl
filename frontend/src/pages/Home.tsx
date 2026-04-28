import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, Users, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-sky-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?q=80&w=2070&auto=format&fit=crop" 
            alt="Clean Beach" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Protect Our <span className="text-sky-400">Oceans</span>, <br />
              One Beach at a Time.
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-10 leading-relaxed">
              Samudra Seva empowers communities to monitor, report, and clean up coastal waste. Join the movement for cleaner, healthier shores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/join" className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                Join a Cleanup <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/report" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2">
                Report Garbage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-sky-50 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-sky-600 mb-1">1,250+</p>
              <p className="text-slate-600 font-medium">kg Waste Collected</p>
            </div>
            <div className="text-center border-l border-sky-200">
              <p className="text-4xl font-extrabold text-sky-600 mb-1">85+</p>
              <p className="text-slate-600 font-medium">Cleanup Drives</p>
            </div>
            <div className="text-center border-l border-sky-200">
              <p className="text-4xl font-extrabold text-sky-600 mb-1">20+</p>
              <p className="text-slate-600 font-medium">Active Beaches</p>
            </div>
            <div className="text-center border-l border-sky-200">
              <p className="text-4xl font-extrabold text-sky-600 mb-1">5,000+</p>
              <p className="text-slate-600 font-medium">Volunteers Joined</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">A community-driven approach to coastal conservation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-sky-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Trash2 className="h-7 w-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Report Issues</h3>
              <p className="text-slate-600 leading-relaxed">
                Spot garbage on your local beach? Use our quick reporting tool to alert the community and log the waste level.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-sky-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Monitor Status</h3>
              <p className="text-slate-600 leading-relaxed">
                Check real-time cleanliness scores for popular beaches like Juhu and Versova before you visit.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-sky-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Take Action</h3>
              <p className="text-slate-600 leading-relaxed">
                Join our network of volunteers. Participate in organized cleanup drives and make a tangible difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Gallery */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Cleanup Success Stories</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Witness the transformation of our coastlines through collective effort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Versova Transformation",
                description: "Over 5 million kg of trash removed by Afroz Shah and volunteers.",
                image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Juhu Shore Recovery",
                description: "Regular weekend drives have brought back the natural beauty of the sands.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
              },
              {
                title: "Aksa Beach Awareness",
                description: "Community programs reduced plastic usage by 40% in local stalls.",
                image: "https://images.unsplash.com/photo-1520116467521-81b47040232c?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((story, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
