import { Router } from 'express'
import controller from '../controllers/products.js'
import middleware from './middlewares/session.js'

const router = Router()

router.get('/', middleware.activeSession, controller.goToHome)
router.get('/index', middleware.activeSession, controller.getProducts)
router.post('/', middleware.activeSession, controller.postProduct)

export default router