import express from 'express'

import { createServer } from "http";
import { Server } from "socket.io";

const router = express.Router()
const test = express.Router()
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/productos', router)
app.use('/api/productos-test', test)

app.use(express.static('./public'))
app.set('view engine', 'ejs')

import bcrypt from 'bcryptjs'
import { generarProducto } from './utils/productosFaker.js'
import { assignedNewId, Productos } from './controllers/productos.js'
import { normalizacionSave, denormalizar, porcentajeConversion } from './utils/normalize.js'
import {getUser, usersMongodb, getExpires, cantSesiones, destroySession} from "./utils/connection.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Persistencia en Mongo Atlas
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://axelken93:Racing200793@backend32190.e4b0dmz.mongodb.net/chat+productos?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: "myKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

//Passport Local
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
//----------------------------------------------------//
passport.use('register', new LocalStrategy({
    passReqToCallback: true    
}, async (req, username, password, done) => {

    let usuarios = await usersMongodb.getAll()
    let usuario = await usuarios.find(usuario => usuario.username == username)

    if (usuario) {
        console.log('ERROR: el nombre de usuario ya esta registrado')
        return done(null,false)
    }

    let hashPassword = await bcrypt.hash(req.body.password, 8)
    let newUser = {username: username, password: hashPassword }
    usersMongodb.save(newUser)

    done(null, newUser)
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {
    
    let usuarios = await usersMongodb.getAll()
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
    let usuarios = await usersMongodb.getAll()
    let usuario = await usuarios.find(usuario => usuario.username == username)
    done(null, usuario)
})
//----------------------------------------------------//



///Declaración de constantes
const PORT = 8080
const productos = new Productos('productos.txt');
const mensajes = new Productos('historialMensajes.txt')





app.get('/login', (req, res) => {
    destroySession()
    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.sendFile('/public/login.html', {root: __dirname})
        } else {
            res.redirect("/productos")    
        }
    })
})

function postLogin (req, res) {
        const username = req.body.username
        req.session.user = username
        res.redirect("/productos")
}

app.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), postLogin)


app.get('/register', (req, res) => {
    res.sendFile('/public/register.html', {root: __dirname})
})

app.post('/register', passport.authenticate('register', { 
    failureRedirect: '/failregister', 
    successRedirect: '/login'
}))

app.get('/failregister', (req, res) => {
    res.sendFile('/public/failregister.html', {root: __dirname})
})

app.get('/faillogin', (req, res) => {
    res.sendFile('/public/faillogin.html', {root: __dirname})
})

app.get('/logout', (req, res) => {

    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.redirect("/login")
        } else {
            res.sendFile('/public/logout.html', {root: __dirname})
        }
    })
})


app.get('/', (req, res) => {
    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.redirect("/login")
        } else {
            res.redirect('/productos')
        }
    })
})

router.get('/', (req, res) => {
    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.redirect("/login")
        } else {
            res.sendFile('/public/index.html', {root: __dirname})
            getExpires(60000).then((data) => {
                req.session = data
            })
        }
    })
})

router.get('/index', (req, res) => {
    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.redirect("/login")
        } else {
            productos.getAll()
            .then( (products) => {
                res.render('index', {products})
            })
            getExpires(60000).then((data) => {
                req.session = data
            })
        }
    })
})

// Test de 5 productos fakers.
test.get('/', (req, res) => {
    let products = []
    let cantidadProductos = 5 //modificable
    for (let i = 0; i < cantidadProductos; i++) {
        const newProduct = generarProducto()
        products.push(newProduct)
    }
    console.log(products)
    getExpires(60000).then((data) => {
        req.session = data
    })
    res.render('index', {products})

})

router.post('/', (req, res) => {
    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.redirect("/login")
        } else {
            getExpires(60000).then((data) => {
                req.session = data
            })
            let newProduct = req.body
            newProduct.id = assignedNewId()
            console.log(newProduct)
            productos.save(newProduct)
                .then(() => {
                    console.log("Articulo insertado con exito")
                    res.redirect('/productos') 
                })
        }
    })
})


io.on('connection', socket =>{

    productos.getAll()
        .then( (pproducto) => {
            socket.emit('prueba', pproducto)
        })
    socket.on('new-product', data => {
        console.log(data)
    })
    productos.getAll()
        .then( (pproducto) => {
            io.sockets.emit('prueba', pproducto)
        })

    porcentajeConversion().then((data) =>{
        socket.emit('conver', data)
    })

    mensajes.getAll()
        .then( (m) => {
            denormalizar(m).then((message) => {
                socket.emit('message', message.mensajes)
            })
        })

    socket.on('new-message', data => {
        normalizacionSave(data)
        .then((message) => {
            io.sockets.emit('message', message.mensajes)
        })

    });

    /// DESAFIO 10
    socket.on('new-user', userName => {
        console.log(userName)
    })

    cantSesiones().then((cantidad) => {
        if (cantidad !==0){
            getUser().then((data) => {
                socket.emit('login', data)
            })
            getUser().then((data) => {
                socket.emit('logout', data)
            })
        } else {
            let data = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">INICIE SESION</h2>
            <button onclick="location.href= '/login'" class="btn btn-warning m-2 text-light">SignIn</button>`
            socket.emit('signin', data)
        }
    })

})



///Escuchando el programa
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})