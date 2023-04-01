import { Router } from 'express'
import GraphqlController from '../controllers/productsGraphql.js'
import middleware from './middlewares/session.js'

const router = Router()

router.use('/', middleware.activeSession, GraphqlController)


export default router