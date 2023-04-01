import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import db from '../../persistence/login.js'

passport.use('register', new LocalStrategy({
    passReqToCallback: true    
}, async (req, username, password, done) => {

    let usuarios = await db.obtenerTodosUsuarios()
    let usuario = await usuarios.find(usuario => usuario.username == username)

    if (usuario) {
        console.log('ERROR: el nombre de usuario ya esta registrado')
        return done(null,false)
    }

    let hashPassword = await bcrypt.hash(req.body.password, 8)
    let newUser = {username: username, password: hashPassword }
    db.sumarUsuario(newUser)

    done(null, newUser)
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {
    let usuarios = await db.obtenerTodosUsuarios()
    let usuario = await usuarios.find(usuario => usuario.username == username)
    if (!usuario) {
        console.log("ERROR: Usuario Inexistente")
        return done(null, false)
    }

    let compare = await bcrypt.compare(password, usuario.password)
    if(compare) {
        return done(null, usuario)
    } else {
        console.log("ERROR: Password Incorrecto")
        return done(null, false)
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    let usuarios = await db.obtenerTodosUsuarios()
    let usuario = await usuarios.find(usuario => usuario.username == username)
    done(null, usuario)
})

export {passport};