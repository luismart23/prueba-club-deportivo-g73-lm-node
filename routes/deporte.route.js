import { Router } from 'express'
import { createDeporte, getAllDeportes, getDeporte, removeDeporte, updateDeporte } from '../controllers/deporte.controller.js'

const router = Router()

router.get('/', getAllDeportes)
router.get('/:uid', getDeporte)
router.post('/', createDeporte)
router.put('/:uid', updateDeporte)
router.delete('/:uid', removeDeporte)

export default router;

