import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Beach } from '../models/Beach';
import { Volunteer } from '../models/Volunteer';
import { Event } from '../models/Event';

dotenv.config();

const beachesData = [
  {
    name: 'Juhu Beach',
    location: 'Juhu, Mumbai, Maharashtra',
    cleanlinessLevel: 2,
    wasteLevel: 'high',
    description: 'Heavy plastic and food waste found near the shoreline. Immediate cleanup needed.',
  },
  {
    name: 'Versova Beach',
    location: 'Versova, Andheri West, Mumbai',
    cleanlinessLevel: 4,
    wasteLevel: 'low',
    description: 'Thanks to the Versova Cleanup project, the beach is in good condition with minimal litter.',
  },
  {
    name: 'Girgaon Chowpatty',
    location: 'Marine Drive, Mumbai, Maharashtra',
    cleanlinessLevel: 3,
    wasteLevel: 'moderate',
    description: 'Post-festival cleanup underway. Moderate waste levels. Volunteers needed this weekend.',
  },
  {
    name: 'Aksa Beach',
    location: 'Malad West, Mumbai, Maharashtra',
    cleanlinessLevel: 4,
    wasteLevel: 'low',
    description: 'Relatively clean and calm beach. Regular monitoring in place.',
  },
  {
    name: 'Gorai Beach',
    location: 'Borivali West, Mumbai, Maharashtra',
    cleanlinessLevel: 2,
    wasteLevel: 'high',
    description: 'Industrial waste and plastic debris spotted. Urgent cleanup drive scheduled.',
  },
  {
    name: 'Madh Island Beach',
    location: 'Malad West, Mumbai, Maharashtra',
    cleanlinessLevel: 5,
    wasteLevel: 'low',
    description: 'One of the cleanest beaches in Mumbai. Well maintained by local community groups.',
  },
];

const volunteersData = [
  { name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 98765 11111', location: 'Andheri West, Mumbai', availability: 'Weekends', joinedAt: new Date('2024-01-15') },
  { name: 'Rohan Mehta', email: 'rohan.m@example.com', phone: '+91 98765 22222', location: 'Bandra, Mumbai', availability: 'Weekdays', joinedAt: new Date('2024-02-10') },
  { name: 'Sneha Patil', email: 'sneha.p@example.com', phone: '+91 98765 33333', location: 'Juhu, Mumbai', availability: 'Flexible', joinedAt: new Date('2024-03-05') },
  { name: 'Arjun Nair', email: 'arjun.n@example.com', phone: '+91 98765 44444', location: 'Versova, Mumbai', availability: 'Weekdays & Weekends', joinedAt: new Date('2024-03-20') },
  { name: 'Kavita Joshi', email: 'kavita.j@example.com', phone: '+91 98765 55555', location: 'Borivali, Mumbai', availability: 'Weekends', joinedAt: new Date('2024-04-01') },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/samudra-seva');
    console.log('MongoDB Connected for seeding...');

    await Beach.deleteMany({});
    await Volunteer.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing data.');

    const createdBeaches = await Beach.insertMany([
      {
        name: 'Juhu Beach',
        location: 'Juhu, Mumbai, Maharashtra',
        cleanlinessLevel: 2,
        wasteLevel: 'high',
        description: 'Heavy plastic and food waste found near the shoreline. Immediate cleanup needed.',
        latitude: 19.1050,
        longitude: 72.8264,
      },
      {
        name: 'Versova Beach',
        location: 'Versova, Andheri West, Mumbai',
        cleanlinessLevel: 4,
        wasteLevel: 'low',
        description: 'Thanks to the Versova Cleanup project, the beach is in good condition with minimal litter.',
        latitude: 19.1350,
        longitude: 72.8090,
      },
      {
        name: 'Girgaon Chowpatty',
        location: 'Marine Drive, Mumbai, Maharashtra',
        cleanlinessLevel: 3,
        wasteLevel: 'moderate',
        description: 'Post-festival cleanup underway. Moderate waste levels. Volunteers needed this weekend.',
        latitude: 18.9515,
        longitude: 72.8166,
      },
      {
        name: 'Aksa Beach',
        location: 'Malad West, Mumbai, Maharashtra',
        cleanlinessLevel: 4,
        wasteLevel: 'low',
        description: 'Relatively clean and calm beach. Regular monitoring in place.',
        latitude: 19.1760,
        longitude: 72.7938,
      },
      {
        name: 'Gorai Beach',
        location: 'Borivali West, Mumbai, Maharashtra',
        cleanlinessLevel: 2,
        wasteLevel: 'high',
        description: 'Industrial waste and plastic debris spotted. Urgent cleanup drive scheduled.',
        latitude: 19.2450,
        longitude: 72.7830,
      },
      {
        name: 'Madh Island Beach',
        location: 'Malad West, Mumbai, Maharashtra',
        cleanlinessLevel: 5,
        wasteLevel: 'low',
        description: 'One of the cleanest beaches in Mumbai. Well maintained by local community groups.',
        latitude: 19.1330,
        longitude: 72.7950,
      },
    ]);
    console.log(`✅ Inserted ${createdBeaches.length} beaches.`);

    await Volunteer.insertMany(volunteersData);
    console.log(`✅ Inserted ${volunteersData.length} volunteers.`);

    const events = [
      {
        title: 'Morning Cleanup at Juhu',
        description: 'Join us for a morning cleanup drive to remove plastic waste from the shoreline.',
        beachId: createdBeaches[0]._id,
        date: '2024-05-15',
        time: '07:00 AM',
        organizer: 'Samudra Seva Team',
        volunteersCount: 12,
      },
      {
        title: 'Versova Coastal Cleanup',
        description: 'A community-led initiative to keep Versova beach clean and healthy.',
        beachId: createdBeaches[1]._id,
        date: '2024-05-20',
        time: '04:00 PM',
        organizer: 'Afroz Shah Foundation',
        volunteersCount: 45,
      },
      {
        title: 'Weekend Drive at Gorai',
        description: 'Help us tackle industrial waste and plastic debris at Gorai Beach.',
        beachId: createdBeaches[4]._id,
        date: '2024-05-25',
        time: '08:30 AM',
        organizer: 'Green Earth NGO',
        volunteersCount: 8,
      },
    ];

    await Event.insertMany(events);
    console.log(`✅ Inserted ${events.length} events.`);

    console.log('\n🌊 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
