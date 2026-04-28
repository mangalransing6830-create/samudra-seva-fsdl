import express from 'express';
import { getEvents, createEvent, joinEvent } from '../controllers/eventController';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id/join')
  .post(joinEvent);

export default router;
