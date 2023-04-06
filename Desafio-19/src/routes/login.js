import Router from 'koa-router'
import controller from '../controllers/login.js'
//import middleware from './middlewares/session.js'
//import {passport} from './middlewares/passportLocal.js'

const router = new Router()

router.get('/', controller.goToHome)
router.get('/login', controller.goToLogin)
router.post('/login', controller.postLogin)
router.get('/faillogin', controller.failLogin)

router.get('/register', controller.goToRegister)
router.post('/register', controller.postRegister)
router.get('/failregister', controller.failRegister)

router.get('/logout', controller.goToLogout)



// router.get('/', controller.goToHome)
// router.get('/login', controller.goToLogin)
// router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), controller.postLogin)
// router.get('/faillogin', controller.failLogin)

// router.get('/register', controller.goToRegister)
// router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), controller.goToLogin)
// router.get('/failregister', controller.failRegister)

// router.get('/logout', controller.goToLogout)

export default router