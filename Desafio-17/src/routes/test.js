import { Router } from 'express'
import controller from '../controllers/test.js'

const router = Router()

router.get('/', controller.getFakers)

export default router