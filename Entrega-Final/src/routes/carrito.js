import { Router } from 'express'
import controller from '../controllers/carrito.js'
import middleware from './middleware/session.js'

const router = Router()

router.get('/', middleware.activeSession, controller.getCharts)
router.post('/', middleware.activeSession, controller.postChart)
router.delete('/', middleware.activeSession, controller.deleteChart)
router.get('/:num', middleware.activeSession, controller.getChartId)
router.delete('/:num', middleware.activeSession, controller.deleteChartId)
router.put('/:num', middleware.activeSession, controller.putChart)

export default router