import db from '../../persistence/login.js'

async function activeSession(req, res, next) {
    let sessionNumber = await db.cantSesiones()
    if (sessionNumber == 0) {
        res.redirect('/login')
        next()
    } else {
        next()
    }
}

function destroySession(req, res, next) {
    db.destroySession().then(() => {next()})
}

export default {
    activeSession,
    destroySession
}