import express from 'express'
import fs from 'fs';

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

///Declaración de constantes
const PORT = 8080
const productos = new Productos('productos.txt');
const mensajes = new Productos('historialMensajes.txt')


// Get
router.get('/', (req, res) => {
    res.sendFile('/public/index.html', {root: 'C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-9'})
})

router.get('/index', (req, res) => {
    productos.getAll()
        .then( (products) => {
            res.render('index', {products})
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
    res.render('index', {products})

})

router.post('/', (req, res) => {
    let newProduct = req.body
    newProduct.id = assignedNewId()
    console.log(newProduct)
    productos.save(newProduct)
        .then(() => {
            console.log("Articulo insertado con exito")
            res.redirect('/productos') 
        })
})


io.on('connection', socket =>{
    console.log('Un cliente se ha conectado')

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
})


///Escuchando el programa
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})