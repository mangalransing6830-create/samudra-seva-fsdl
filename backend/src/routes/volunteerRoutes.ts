import express from 'express';
import { getVolunteers, createVolunteer } from '../controllers/volunteerController';

const router = express.Router();

router.route('/')
  .get(getVolunteers)
  .post(createVolunteer);

export default router;
