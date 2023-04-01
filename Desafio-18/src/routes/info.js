import { Router } from 'express'
import controller from '../controllers/info.js'

const router = Router()

router.get('/', controller.getInfo)

export default router