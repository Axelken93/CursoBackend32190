import express from 'express'
const app = express()

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer)

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import compression from 'compression'
app.use(compression())

import env from './utils/config/variables.js'

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

app.use(express.static(path.join(__dirname, '/src/public')));

console.log(path.join(__dirname, '/src/public'))

import productos from './src/persistence/products.js'
import sessions from './src/persistence/login.js'


//--------------Persistencia en Mongo Atlas----------------//

import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: env.MongoUrl,
        mongoOptions: advancedOptions
    }),
    secret: env.MongoKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

//-----------------Routes------------------//

import routerProduct from './src/routes/products.js'
import routerLogin from './src/routes/login.js'
import routerTest from './src/routes/test.js'
import routerInfo from './src/routes/info.js'
import routerAlls from './src/routes/alls.js'

app.use('/productos', routerProduct)
app.use('/', routerLogin)
app.use('/test', routerTest)
app.use('/info', routerInfo)
app.get('*', routerAlls)



//-------------------Socket IO-------------------//

io.on('connection', (socket) => {
    console.log("un cliente se ha conectado")

    socket.emit('event_name', {data: 'Hello, World!'});

    productos.listarTodas()
        .then( (pproducto) => {
            socket.emit('prueba', pproducto)
        })
    socket.on('new-product', data => {
        console.log(data)
    })
    productos.listarTodas()
        .then( (pproducto) => {
            io.sockets.emit('prueba', pproducto)
        })

    socket.on('new-user', userName => {
        console.log(userName)
    })

    sessions.cantSesiones().then((cantidad) => {
        if (cantidad !==0){
            sessions.getUser().then((data) => {
                socket.emit('login', data)
            })
            sessions.getUser().then((data) => {
                socket.emit('logout', data)
            })
        } else {
            let data = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">INICIE SESION</h2>
            <button onclick="location.href= '/login'" class="btn btn-warning m-2 text-light">SignIn</button>`
            socket.emit('signin', data)
        }
    })

})


//------------------Inicialización---------------------//

const PORT = env.PORT || 8080
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})
