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

// Clase contenedor del desafio nro 2 - Le quito la asincronia 
class Contenedor {
    constructor (fileName) {
        this.fileName = fileName
    };

    save(obj) {   
        try {
            let data = readFile(`public/${this.fileName}`)
            data.push(obj)
            let strData = JSON.stringify(data, null, 2)
            fs.promises.writeFile(`public/${this.fileName}`, strData)
            return obj.id
        }
        catch (err) {
            console.log (`Hubo el siguiente error al agregar el objeto: ${err}`)
        }
    };

    getById(num) {   
        try {  
            let filtred = readFile(`public/${this.fileName}`).filter( x => {return x.id === num});
            return filtred;
        }
        catch (err) {
            console.log (`El ID buscado no existe. \nDetalle del ${err}`)
        }
    };

    getAll() {   
        try {  
            let reading = readFile(`public/${this.fileName}`);
            return reading;
        }
        catch (err) {
            console.log (`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    };

    deleteById(num) {   
        try {
            const data = readFile(`public/${this.fileName}`).filter( x => {return x.id !== num});
            let stringData = JSON.stringify(data, null, 2)
            fs.promises.writeFile(`public/${this.fileName}`, stringData);
        }
        catch (err) {
            console.log (`Se presenta el siguiente ${err}`)
        }
    };

    deleteAll() {   
        try {  
            fs.promises.writeFile(`public/${this.fileName}`, '');
        }
        catch (err) {
            console.log (`Se presenta el siguiente ${err}`)
        }
    };
};


//Funciones auxiliares
function readFile(fileName) {
    let fileRead = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
    return fileRead;
}

function checkId (num, path) {
    const arrayID = JSON.parse(fs.readFileSync(path, 'utf-8')).map((x) => {return x.id})
    if (arrayID.some((e) => {return e == num})) {
        return true
    } else {return false}
}

///Declaración de constantes
const PORT = 8080

//Ejecución del programa del desafio nro 2
let productos = new Contenedor('productos.txt');



// Get
router.get('/index', (req, res) => {
    const products = JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8'))
    res.render('index', {products})
})

router.get('/', (req, res) => {
    res.sendFile('/public/index.html', {root: __dirname})
})

// post
router.post('/', (req, res) => {
    let newProduct = req.body
    newProduct.id = Math.max(...JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8')).map((x) => {return x.id}))+1
    productos.save(newProduct)
    console.log(`ID del nuevo producto: ${newProduct.id}`)
    res.redirect('/productos') 
})

io.on('connection', socket =>{
    console.log('Un cliente se ha conectado')

    let pproducto = JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8'))

    socket.emit('prueba', pproducto)
    socket.on('new-product', data => {
        console.log(data)
    })

    let message = JSON.parse(fs.readFileSync("public/historialMensajes.txt", 'utf-8'))

    socket.emit('message', message)
    socket.on('new-message', data => {
        message.push(data)

        //Guardar el historial de mensajes:
        let strMsj = JSON.stringify(message, null, 2)
        fs.promises.writeFile("public/historialMensajes.txt", strMsj)

        io.sockets.emit('message', message)

    });
    
    io.sockets.emit('prueba', pproducto)
})

///Escuchando el programa
httpServer.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})