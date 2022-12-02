const express = require('express')
const fs = require('fs');
const { title } = require('process');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routers
const { Router } = express
const routerCarrito = require('./routes/carrito')
const productsRoute = require('./routes/productos')


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