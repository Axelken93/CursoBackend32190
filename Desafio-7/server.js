const express = require('express')
const fs = require('fs');
const { title } = require('process');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const router = express.Router()
const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/productos', router)

app.use(express.static('./public'))
app.set('view engine', 'ejs')

const { options } = require('./options/mysqlconn')
const { ClienteSQL } = require('./controllers/sqlClass');
const { optionsSqlite } = require('./options/sqlite3conn');
const sql = new ClienteSQL(options, 'productos')
const sqlite = new ClienteSQL(optionsSqlite, 'mensajes')
//const { productos, checkId, readFile, readFileProducts, assignedNewId, readFileArrayId } = require('./controllers/productos');


///Declaración de constantes
const PORT = 8080


// Get
router.get('/', (req, res) => {
    res.sendFile('/public/index.html', {root: __dirname})
})

router.get('/index', (req, res) => {
    sql.listarProductos()
        .then( (products) => {
            res.render('index', {products})
        })
})

// post
router.post('/', (req, res) => {
    let newProduct = req.body
    console.log(newProduct)
    sql.insertarProductos(newProduct)
        .then(() => {
            console.log("Articulo insertado con exito")
            res.redirect('/productos') 
        })
})


io.on('connection', socket =>{
    console.log('Un cliente se ha conectado')

    sql.listarProductos()
        .then( (pproducto) => {
            socket.emit('prueba', pproducto)
        })
    socket.on('new-product', data => {
        console.log(data)
    })
    sql.listarProductos()
        .then( (pproducto) => {
            io.sockets.emit('prueba', pproducto)
        })

    sqlite.listarProductos()
        .then( (message) => {
        socket.emit('message', message)
        })

    socket.on('new-message', data => {
        sqlite.insertarProductos(data)
            .then( () => {
                console.log('mensaje guardado en DB con exito')
                return sqlite.listarProductos()
            })
            .then ( (message) => {
                io.sockets.emit('message', message)
            })
    });
})



///Escuchando el programa
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})