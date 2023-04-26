import { Router } from 'express'
import controller from '../controllers/products.js'
import middleware from './middleware/session.js'

const router = Router()

router.get('/:categoria?', middleware.activeSession, controller.getProducts)
router.post('/', middleware.activeSession, controller.postProduct)
router.delete('/', middleware.activeSession, controller.deleteProduct)
router.get('/:num', middleware.activeSession, controller.getProductId)
router.delete('/:num', middleware.activeSession, controller.deleteProductId)
router.put('/:num', middleware.activeSession, controller.putProduct)

export default router