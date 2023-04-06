import Router from 'koa-router'
import controller from '../controllers/info.js'

const router = new Router({
    prefix: '/info'
})

router.get('/', controller.getInfo)

export default router