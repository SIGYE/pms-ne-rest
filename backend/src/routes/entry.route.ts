import { Router } from 'express';
import {
  createCarEntry,
  getAllCarEntries,
  getCarEntryById,
  updateCarExit,
  deleteCarEntry,
} from '../controllers/entry.controller';

const router = Router();

router.post('/entries', createCarEntry);
router.get('/entries', getAllCarEntries);
router.get('/entries/:id', getCarEntryById);
router.put('/entries/:id/exit', updateCarExit);
router.delete('/entries/:id', deleteCarEntry);

export default router;
