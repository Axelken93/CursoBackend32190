import { Router } from 'express'
import controller from '../controllers/message.js'
import middleware from './middlewares/session.js'

const router = Router()

router.get('/', middleware.activeSession, controller.goToMessage)
router.post('/', middleware.activeSession, controller.postMessage)

export default router