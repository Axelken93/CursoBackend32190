//-----------------Paquetes y Dependencias-----------------//
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

import env from './utils/config/inputs.js'

app.use(express.urlencoded({extended: true}))
app.use(express.json())

import socketEvent from './utils/websocket/socketEvent.js'
app.use(express.static(path.join(__dirname, '/public')));



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

//--------------------------Routes-------------------------//
import routerProduct from './src/routes/products.js'
import routerMsj from './src/routes/chat.js'
import routerLogin from './src/routes/login.js'
import routerAlls from './src/routes/alls.js'
import routerCarrito from './src/routes/carrito.js'
import routerOrden from './src/routes/orden.js'

app.use('/productos', routerProduct)
app.use('/carrito', routerCarrito)
app.use('/finalizar_orden', routerOrden)
app.use('/chat', routerMsj)
app.use('/', routerLogin)
app.get('*', routerAlls)


//-----------------------Socket IO-------------------------//

socketEvent(io)


//----------------------Inicialización---------------------//

const PORT = env.PORT || 8080
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})
