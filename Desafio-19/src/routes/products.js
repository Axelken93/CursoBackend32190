import Router from 'koa-router'
import controller from '../controllers/products.js'


const router = new Router({
    prefix: '/productos'
})

router.get('/', controller.goToHome)
router.get('/index', controller.getProducts)
router.post('/', controller.postProduct)

// router.get('/', middleware.activeSession, controller.goToHome)
// router.get('/index', middleware.activeSession, controller.getProducts)
// router.post('/', middleware.activeSession, controller.postProduct)

export default router