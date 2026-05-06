import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { socket } from '../socket';

interface Beach {
  name: string;
  location: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  beachId: Beach;
  date: string;
  time: string;
  organizer: string;
  volunteersCount: number;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    socket.on('event_updated', (updatedEvent: Event) => {
      setEvents((prevEvents) => {
        const index = prevEvents.findIndex((e) => e._id === updatedEvent._id);
        if (index !== -1) {
          const newEvents = [...prevEvents];
          newEvents[index] = {
            ...updatedEvent,
            // Keep the beachId object if it was populated before and the update doesn't have it fully populated
            beachId: updatedEvent.beachId || prevEvents[index].beachId
          };
          return newEvents;
        } else {
          return [updatedEvent, ...prevEvents];
        }
      });
    });

    return () => {
      socket.off('event_updated');
    };
  }, []);

  const handleJoin = async (eventId: string) => {
    if (joinedEvents.includes(eventId)) return;

    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/join`);
      setJoinedEvents([...joinedEvents, eventId]);
      setEvents(events.map(event => 
        event._id === eventId 
          ? { ...event, volunteersCount: event.volunteersCount + 1 } 
          : event
      ));
    } catch (error) {
      console.error('Error joining event:', error);
    }
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
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Upcoming Cleanup Drives</h1>
        <p className="text-slate-600">Join our community and participate in scheduled cleaning events across the city.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
            <div className="md:w-1/3 bg-sky-100 flex flex-col items-center justify-center p-6 text-sky-800">
              <Calendar className="h-10 w-10 mb-2" />
              <p className="text-2xl font-bold">{new Date(event.date).getDate()}</p>
              <p className="text-sm font-semibold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
              <p className="mt-2 font-medium">{event.time}</p>
            </div>
            
            <div className="p-8 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                <div className="flex items-center gap-1 text-sky-600 font-bold bg-sky-50 px-3 py-1 rounded-full text-sm">
                  <Users className="h-4 w-4" />
                  {event.volunteersCount}
                </div>
              </div>
              
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {event.description}
              </p>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <MapPin className="h-4 w-4 text-sky-500" />
                  {event.beachId?.name || 'Unknown Beach'}, {event.beachId?.location || 'Location N/A'}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Clock className="h-4 w-4 text-sky-500" />
                  Organized by: <span className="text-slate-700 font-bold">{event.organizer}</span>
                </div>
              </div>

              <button
                onClick={() => handleJoin(event._id)}
                disabled={joinedEvents.includes(event._id)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  joinedEvents.includes(event._id)
                    ? 'bg-emerald-100 text-emerald-700 cursor-default border border-emerald-200'
                    : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm'
                }`}
              >
                {joinedEvents.includes(event._id) ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    You are joined!
                  </>
                ) : (
                  'Sign Up for Drive'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
