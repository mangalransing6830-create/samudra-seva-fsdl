import express from 'express';
import { getBeaches, createBeach, updateBeach } from '../controllers/beachController';

const router = express.Router();

router.route('/')
  .get(getBeaches)
  .post(createBeach);

router.route('/:id')
  .put(updateBeach);

export default router;
