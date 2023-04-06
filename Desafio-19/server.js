import koa from 'koa'
import {koaBody} from 'koa-body';
const app = new koa()
app.use(koaBody())

import http from 'http';
import { Server } from 'socket.io';
import koaStatic from 'koa-static';
import socketEvent from './utils/tools/socketEvent.js'


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import env from './utils/config/variables.js'

import bodyParser from 'koa-bodyparser'
app.use(bodyParser())

import views from 'koa-views'
app.use(views(path.join(__dirname, '/src/views'), {
    extension: 'ejs'
  }))

app.use(koaStatic(path.join(__dirname, '/src/public')));


//--------------Persistencia en Mongo Atlas----------------//
// import cookieParser from 'cookie-parser'
// import session from 'express-session'
// import MongoStore from 'connect-mongo'
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
// app.use(cookieParser())
// app.use(session({
//     store: MongoStore.create({
//         mongoUrl: env.MongoUrl,
//         mongoOptions: advancedOptions
//     }),
//     secret: env.MongoKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 600000
//     }
// }))

//-----------------Routes------------------//
import routerProduct from './src/routes/products.js'
import routerMsj from './src/routes/message.js'
import routerLogin from './src/routes/login.js'
import routerTest from './src/routes/test.js'
import routerInfo from './src/routes/info.js'

app.use(routerProduct.routes())
app.use(routerMsj.routes())
app.use(routerLogin.routes())
app.use(routerTest.routes())
app.use(routerInfo.routes())





//--------------------Socket IO------------------------//
const server = http.createServer(app.callback());
const io = new Server(server);

socketEvent(io)


//------------------Inicialización---------------------//
import fs from 'fs'
await fs.promises.writeFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', "")

const PORT = env.PORT || 8080
server.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor Koaescuchando en el ' + PORT)
})
