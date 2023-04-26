import { Router } from 'express'
import controller from '../controllers/chat.js'

const router = Router()

router.get('/', controller.getToMessages)
router.get('/:mail', controller.getMessagesByMail)
router.post('/', controller.postMessage)

export default router