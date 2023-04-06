import Router from 'koa-router'
import controller from '../controllers/test.js'

const router = new Router({
    prefix: '/test'
})

router.get('/', controller.getFakers)

export default router