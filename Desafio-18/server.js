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

import socketEvent from './utils/tools/socketEvent.js'
app.use(express.static(path.join(__dirname, '/src/public')));



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
import routerProductGraphql from './src/routes/productsGraphql.js'
import routerMsj from './src/routes/message.js'
import routerLogin from './src/routes/login.js'
import routerTest from './src/routes/test.js'
import routerInfo from './src/routes/info.js'
import routerAlls from './src/routes/alls.js'

app.use('/graphql', routerProductGraphql)
app.use('/productos', routerProduct)
app.use('/mensajes', routerMsj)
app.use('/', routerLogin)
app.use('/test', routerTest)
app.use('/info', routerInfo)
app.get('*', routerAlls)


//--------------------Socket IO------------------------//

socketEvent(io)


//------------------Inicialización---------------------//

const PORT = env.PORT || 8080
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})
