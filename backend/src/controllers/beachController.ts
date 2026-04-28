import { Request, Response } from 'express';
import { Beach } from '../models/Beach';

export const getBeaches = async (req: Request, res: Response) => {
  try {
    const beaches = await Beach.find().sort({ updatedAt: -1 });
    res.json(beaches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBeach = async (req: Request, res: Response) => {
  try {
    const beach = new Beach(req.body);
    const createdBeach = await beach.save();
    res.status(201).json(createdBeach);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateBeach = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const beach = await Beach.findByIdAndUpdate(id, req.body, { new: true });
    if (!beach) {
      return res.status(404).json({ message: 'Beach not found' });
    }
    res.json(beach);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
