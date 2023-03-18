import { Router } from 'express'
import controller from '../controllers/alls.js'

const routerAlls = Router()

routerAlls.get('*', controller)

export default routerAlls