const express = require('express')
const fs = require('fs');
const { title } = require('process');

const app = express()
//app.use(express.static('public'))

const router = express.Router()
app.use('/productos', router)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//configuracion hbs
const handlebars = require('express-handlebars')
app.engine("hbs",handlebars.engine({
    extname: "hbs",
    defaultLayout: __dirname + "/views/layout/index.hbs",
    layoutsDir: "/views/layout/",
    partialsDir: "/views/partials/"
}));
app.set('view engine', 'hbs')
app.set('views', './views')

// Clase contenedor del desafio nro 2
class Contenedor {
    constructor (fileName) {
        this.fileName = fileName
    };

    async save(obj) {   
        try {
            let data = await readFile(`public/${this.fileName}`)
            data.push(obj)
            let strData = JSON.stringify(data, null, 2)
            await fs.promises.writeFile(`public/${this.fileName}`, strData)
            return obj.id
        }
        catch (err) {
            console.log (`Hubo el siguiente error al agregar el objeto: ${err}`)
        }
    };

    async getById(num) {   
        try {  
            let filtred = await readFile(`public/${this.fileName}`).filter( x => {return x.id === num});
            return filtred;
        }
        catch (err) {
            console.log (`El ID buscado no existe. \nDetalle del ${err}`)
        }
    };

    async getAll() {   
        try {  
            let reading = await readFile(`public/${this.fileName}`);
            return reading;
        }
        catch (err) {
            console.log (`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    };

    async deleteById(num) {   
        try {
            const data = await readFile(`public/${this.fileName}`).filter( x => {return x.id !== num});
            let stringData = JSON.stringify(data, null, 2)
            await fs.promises.writeFile(`public/${this.fileName}`, stringData);
        }
        catch (err) {
            console.log (`Se presenta el siguiente ${err}`)
        }
    };

    async deleteAll() {   
        try {  
            await fs.promises.writeFile(`public/${this.fileName}`, '');
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


// Get
router.get('/index', (req, res) => {
    const products = JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8'))
    const checkExist = products.some((e) => e.id > 1)
    res.render('data', {data: products, productsExist: checkExist})
})

router.get('/', (req, res) => {
    res.render('products')
})


// Post
app.post('/productos/', (req, res) => {
    const newProduct = req.body
    newProduct.id = Math.max(...JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8')).map((x) => {return x.id}))+1
    productos.save(newProduct)
    console.log(`ID del nuevo producto: ${newProduct.id}`)
    res.redirect('/productos')  
})



///Declaración de constantes
const PORT = 8080

//Ejecución del programa del desafio nro 2
let productos = new Contenedor('productos.txt');

///Escuchando el programa
const server = app.listen(PORT, (err) => {
    if(err) throw new Error(`Error en el servidor ${err}`)
    console.log('Servidor escuchando en el ' + PORT)
})