const fs = require('fs');
import readFile from ('./functions')


async function getById(num) {   
    try {  
        let filtred = await readFile(`public/${this.fileName}`).filter( x => {return x.id === num});
        return filtred;
    }
    catch (err) {
        console.log (`El ID buscado no existe. \nDetalle del ${err}`)
    }
};
////POR AHORA NO VA