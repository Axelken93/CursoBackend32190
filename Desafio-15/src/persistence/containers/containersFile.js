import { promises as fs, read } from 'fs'

class ContenedorProductos {
    constructor (fileName) {
        this.fileName = fileName
    };

    async getAll() {   
        try {  
            let reading = await readFile(`${this.fileName}`);
            return reading;
        }
        catch (err) {
            console.log(`Hubo un error al intentar obtener todos los objetos: ${err}`)
        }
    };

    async save(obj) {   
        try {
            let data = await readFile(`${this.fileName}`)
            let objeto = obj
            objeto.id = await assignedNewId()
            data.push(obj)
            let strData = JSON.stringify(data, null, 2)
            await fs.writeFile(`src/persistence/db/${this.fileName}`, strData)
            return obj.id
        }
        catch (err) {
            console.log(`Hubo el siguiente error al agregar el objeto: ${err}`)
        }
    };

    async getById(num) {   
        try {  
            let filtred = await readFile(`${this.fileName}`).filter( x => {return x.id === num});
            return filtred;
        }
        catch (err) {
            console.log(`El ID buscado no existe. /nDetalle del ${err}`)
        }
    };

    async deleteById(num) {   
        try {
            const data = await readFile(`${this.fileName}`).filter( x => {return x.id !== num});
            let stringData = JSON.stringify(data, null, 2)
            await fs.writeFile(`src/persistence/db/${this.fileName}`, stringData);
        }
        catch (err) {
            console.log(`Se presenta el siguiente ${err}`)
        }
    };

    async deleteAll() {   
        try {  
            await fs.writeFile(`src/persistence/db/${this.fileName}`, '');
        }
        catch (err) {
            console.log(`Se presenta el siguiente ${err}`)
        }
    };
};


//Funciones auxiliares
async function readFile(fileName) {
    let fileRead = await fs.readFile('src/persistence/db/'+ fileName, 'utf-8')
    let jsonObj = JSON.parse(fileRead)
    return jsonObj;
}

async function readFileArrayId() {
    let fileRead = await fs.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/persistence/db/productos.txt', 'utf-8')
    let JsonObj = JSON.parse(fileRead).map((x) => {return x.id})
    return JsonObj
}

async function assignedNewId(){
    let arrayID = await readFileArrayId()
    return Math.max(...arrayID)+1
}


export default ContenedorProductos
