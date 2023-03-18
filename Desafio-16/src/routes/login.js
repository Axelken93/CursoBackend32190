import { Router } from 'express'
import controller from '../controllers/login.js'
import middleware from './middlewares/session.js'
import {passport} from './middlewares/passportLocal.js'

const router = Router()

router.get('/', controller.goToHome)
router.get('/login', middleware.destroySession, controller.goToLogin)
router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), controller.postLogin)
router.get('/faillogin', controller.failLogin)

router.get('/register', controller.goToRegister)
router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/login'}))
router.get('/failregister', controller.failRegister)

router.get('/logout', middleware.activeSession, controller.goToLogout)

export default router