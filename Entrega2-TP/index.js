import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routers
const { Router } = express
import { app as routerCarrito } from './routes/carritoMongoDB.js'
import { app as productsRoute } from './routes/productosMongoDB.js'


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