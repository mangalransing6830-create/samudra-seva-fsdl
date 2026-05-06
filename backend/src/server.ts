import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { connectDB } from './config/db';
import beachRoutes from './routes/beachRoutes';
import volunteerRoutes from './routes/volunteerRoutes';
import eventRoutes from './routes/eventRoutes';
import { initSocket } from './socket';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize Socket.io
initSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/beaches', beachRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Samudra Seva API is running...');
});

// Connect to MongoDB & Start Server
const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
