import db from '../../persistence/login.js'

async function activeSession(req, res, next) {
    let sessionNumber = await db.cantSesiones()
    if (sessionNumber === 0) {
        res.redirect('/login')
    } else {
        next()
    }
}

async function destroySession(req, res, next) {
    let sessionNumber = await db.cantSesiones()
    if (sessionNumber === 0) {
        next()
    } else {
        await db.destroySession()
        next()
    }
}

export default {
    activeSession,
    destroySession
}