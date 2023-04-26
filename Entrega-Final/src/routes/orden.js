import { Router } from 'express'
import controller from '../controllers/orden.js'
import middleware from './middleware/session.js'

const router = Router()

router.get('/', middleware.activeSession, controller.finishOrder)

export default router