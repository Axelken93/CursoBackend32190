//Desafio nro 3: Servidores Web
//declaro constantes
const express = require('express')
const app = express()
const fs = require('fs');

const PORT = 8080;


// Clase contenedor del desafio nro 2
class Contenedor {
    constructor (fileName) {
        this.fileName = fileName
    };

    async save(obj) {   
        try {
            let data = await readFile('productos.txt')
            data.push(obj)
            let strData = JSON.stringify(data, null, 2)
            await fs.promises.writeFile(this.fileName, strData)
            return console.log(obj.id)
        }
        catch (err) {
            console.log (`Hubo el siguiente error al agregar el objeto: ${err}`)
        }
    };

    async getById(num) {   
        try {  
            const filtrado = await readFile(this.fileName).filter( x => {return x.id === num});
            console.log(filtrado)
        }
        catch (err) {
            console.log (`El ID buscado no existe. \nDetalle del ${err}`)
        }
    };

    async getAll() {   
        try {  
            let reading = await readFile(this.fileName);
            console.log(reading);
        }
        catch (err) {
            console.log (`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    };

    async deleteById(num) {   
        try {
            const data = await readFile(this.fileName).filter( x => {return x.id !== num});
            let stringData = JSON.stringify(data, null, 2)
            await fs.promises.writeFile(this.fileName, stringData);
        }
        catch (err) {
            console.log (`Se presenta el siguiente ${err}`)
        }
    };

    async deleteAll() {   
        try {  
            await fs.promises.writeFile(this.fileName, '');
        }
        catch (err) {
            console.log (`Se presenta el siguiente ${err}`)
        }
    };
};

function readFile(fileName) {
    let fileRead = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
    return fileRead;
}


//Ejecución del programa del desafio anterior
const productos = new Contenedor('productos.txt');


//Ejecucion del programa del desafio actual
app.get("/", (req, res) => {
    res.send('<h1>"Desafio Clase 3: Servidor Web"</h1>');
});


app.get('/productos', (req, res) => {
    let allProductos = productos.getAll();
    res.send(allProductos);
})

app.get('/productosRandom', (req, res) => {
    const num = Math.random();
    let productoAleatorio = productos.getById(num);
    res.send(productoAleatorio);
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

console.log(productos.getAll());
console.log(productos.getById(1));

