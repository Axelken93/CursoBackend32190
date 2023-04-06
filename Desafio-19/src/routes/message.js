import Router from 'koa-router'
import controller from '../controllers/message.js'
//import middleware from './middlewares/session.js'

const router = new Router({
    prefix: '/mensajes'
})

router.get('/', controller.goToMessage)
router.post('/', controller.postMessage)

// router.get('/', middleware.activeSession, controller.goToMessage)
// router.post('/', middleware.activeSession, controller.postMessage)

export default router