import { selectDB } from './utils/config.js'
import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Elegir la base de datos
const BaseDatos = "firebase"

//Routers
const { Router } = express
let routerCarrito = ""
await import(`${selectDB(BaseDatos).carrito}`).then((elem)=> {
    routerCarrito = elem.app
})
let productsRoute = ""
await import(`${selectDB(BaseDatos).productos}`).then((elem)=> {
    productsRoute = elem.app
})

//import { app as routerCarrito } from './routes/carritoFirebase.js'
//import { app as productsRoute } from './routes/productosFirebase.js'

//Configuracion del Routers
app.use('/api/productos', productsRoute)
app.use('/api/carrito', routerCarrito)

app.all('*', (req, res) => {
    const { url, method } = req
    res.json({ error: -2, descripcion: `Ruta ${url} y metodo ${method} no implementado`});
})

const PORT = process.env.PORT || 8080;

///Escuchando el programa
const server = app.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})