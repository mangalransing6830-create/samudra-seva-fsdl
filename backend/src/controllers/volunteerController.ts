import { Request, Response } from 'express';
import { Volunteer } from '../models/Volunteer';
import { getIO } from '../socket';

export const getVolunteers = async (req: Request, res: Response) => {
  try {
    const volunteers = await Volunteer.find().sort({ joinedAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createVolunteer = async (req: Request, res: Response) => {
  try {
    const volunteer = new Volunteer(req.body);
    const createdVolunteer = await volunteer.save();
    getIO().emit('volunteer_updated', createdVolunteer);
    res.status(201).json(createdVolunteer);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
