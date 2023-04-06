import Router from 'koa-router'
import controller from '../controllers/alls.js'

const routerAlls = new Router()

routerAlls.get('/*', controller.getAlls)

export default routerAlls