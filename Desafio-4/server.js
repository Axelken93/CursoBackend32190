const express = require('express')
const multer = require('multer')
const fs = require('fs');
const { title } = require('process');

const router = express.Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api/productos', router)

///Configuración del Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})


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


//Ejecución del programa: Desafio Actual

//Devuelve todos los productos
router.get('/', (req, res) => {
    productos.getAll().then(allProducts => res.json(allProducts))
});

//Devuelve un producto segun su ID
router.get('/:num', (req, res) => {
    const { num } = req.params
    if (checkId(num,`public/${productos.fileName}`)) {
        productos.getById(parseInt(num)).then(randomProduct => res.json(randomProduct))
    } else {
        res.json({ error: "Producto no encontrado" })
    }
});


//Recibe y agrega un producto. Devuelve su id asignado
router.post('/', (req, res) => {
    let newProduct = req.body
    newProduct.id = Math.max(...JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8')).map((x) => {return x.id}))+1
    productos.save(newProduct)
    res.json(newProduct.id)
});


//Recibe y actualiza un producto segun su id
router.put('/:num', (req, res) => {
    const { num } = req.params
    const newProduct = req.body
    const oldArrayProducts = JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8'))
    const oldProduct = oldArrayProducts[parseInt(num)-1]

    if (checkId(num,`public/${productos.fileName}`)) {
        newProduct.id = parseInt(num)
        oldArrayProducts[parseInt(num)-1] = newProduct
        const newArrayProducts = JSON.stringify(oldArrayProducts,null,2)
        fs.promises.writeFile(`public/${productos.fileName}`, newArrayProducts)
        res.json({ ProductoAnterior: oldProduct, ProductoNuevo: newProduct})
    } else {res.json({ error: "Producto no encontrado" })}
});


//Elimina un producto segun su ID
router.delete('/:num', (req, res) => {
    const { num } = req.params
    const oldArrayProducts = JSON.parse(fs.readFileSync(`public/${productos.fileName}`, 'utf-8'))
    const oldProduct = oldArrayProducts[parseInt(num)-1]

    if (checkId(num,`public/${productos.fileName}`)) {
        const removedProduct = oldArrayProducts.splice(parseInt(num)-1, 1);
        const newArrayProducts = JSON.stringify(oldArrayProducts,null,2)
        fs.promises.writeFile(`public/${productos.fileName}`, newArrayProducts)
        res.json({ Eliminado: removedProduct })
    } else {
        res.json({ error: "Producto no encontrado" })
    }
});


///Declaración de constantes
const PORT = 8080

//Ejecución del programa del desafio nro 2
let productos = new Contenedor('productos.txt');

///Escuchando el programa
const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el ' + PORT)
})