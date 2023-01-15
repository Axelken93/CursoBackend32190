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

import { generarProducto } from './utils/productosFaker.js'
import { assignedNewId, Productos } from './controllers/productos.js'
import { normalizacionSave, denormalizar, porcentajeConversion } from './utils/normalize.js'
import {getUser, getExpires, cantSesiones, destroySession} from "./utils/connection.js";

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

///Declaración de constantes
const PORT = 8080
const productos = new Productos('productos.txt');
const mensajes = new Productos('historialMensajes.txt')

//DESAFIO 10 -> Login

app.get('/login', (req, res) => {
    destroySession()
    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.sendFile('/public/login.html', {root: 'C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-10'})
        } else {
            res.redirect("/productos")    
        }
    })

})

app.post('/login', (req, res) => {
    const userName = req.body.userName
    req.session.user = userName
    res.redirect("/productos")
})

app.get('/logout', (req, res) => {

    cantSesiones().then((cantidad) => {
        if (cantidad == 0) {
            res.redirect("/login")
        } else {
            res.sendFile('/public/logout.html', {root: 'C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-10'})
        }
    })
})

// app.get('/prueba', (req, res) => {
//     cantSesiones().then((cantidad) => {
//         if (cantidad == 0) {
//             res.redirect("/login")
//         } else {
//             res.send(`Usuario logueado: ${req.session.user}`)
//             getExpires(60000).then((data) => {
//                 req.session = data
//             })
//         }
//     })
// })

/////////////////////////////////////////////////////////////////////////

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
            res.sendFile('/public/index.html', {root: 'C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-10'})
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
        }
    })

})



///Escuchando el programa
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})