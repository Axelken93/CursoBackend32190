import express from 'express'

import { createServer } from "http";
import { Server } from "socket.io";

import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer)

import { app as routerOne } from './router.js'

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('./public'))
app.use(routerOne)

io.on('connection', socket =>{

    console.log("Un cliente se ha conectado")
    
    let pproducto = "Axel Ken"
    socket.emit('prueba', pproducto)

    socket.on ('mensaje', data => console.log(data))

})

const PORT = 8080

console.log(process.env.MAURLMONGO)

httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})