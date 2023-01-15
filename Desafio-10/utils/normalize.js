import { normalize, denormalize, schema } from 'normalizr'
import fs from 'fs';


// Definimos schemas
const autores = new schema.Entity('autores')

const msj = new schema.Entity('mensaje', {
    mensajes: [{autor:autores}], 
    autores: [autores] 
})


//funcion Auxiliar
async function normalizacionSave(obj) {
    let readHistorial = JSON.parse(fs.readFileSync('./public/historialMensajes.txt', 'utf-8'))
    let historial = denormalize(readHistorial.result, msj, readHistorial.entities)

    let array = historial.autores
    let arrayMails = array.map((x) => {return x.id})

    let autor = {
        id: obj.id,
        nombre: obj.nombre,
        apellido: obj.apellido,
        edad: obj.edad,
        alias: obj.alias,
        avatar: obj.avatar
     }
    let mensaje = {
        texto: obj.texto,
        date: obj.date,
    }


    if (arrayMails.some((e) => {return e == obj.id})) {
        historial.mensajes.push({mensaje,autor})
        let historialNormalizado = normalize(historial, msj)
        let strHistorial = JSON.stringify(historialNormalizado, null, 2)
        fs.promises.writeFile('./public/historialMensajes.txt', strHistorial)

        return historial

    } else {
        historial.autores.push(autor)
        historial.mensajes.push({mensaje,autor})
        let historialNormalizado = normalize(historial, msj)
        let strHistorial = JSON.stringify(historialNormalizado, null, 2)
        fs.promises.writeFile('./public/historialMensajes.txt', strHistorial)

        return historial
    }
}

async function denormalizar(obj) {
    const objDenormalizado = denormalize(obj.result, msj, obj.entities)
    return objDenormalizado
}

async function porcentajeConversion() {
    const obj = JSON.parse(fs.readFileSync(`./public/historialMensajes.txt`, 'utf-8'))
    let tamanoOriginal = JSON.stringify(obj).length
    let objNormalizado = normalize(obj, msj)
    let tamanoNormalizado = JSON.stringify(objNormalizado).length
    let conversion = (tamanoOriginal / tamanoNormalizado) * 100
    return conversion.toString()
}


// utils

import util from 'util'

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}


export {
    normalizacionSave,
    print,
    denormalizar,
    porcentajeConversion
};




///CHEQUEO POR SI LAS DUDAS

// const historial = {
//     id: "1000",
//     mensajes: [
//       {
//         mensaje: {
//           texto: "Hola",
//           date: "01/01/01"
//         },
//         autor: {
//           id: "a@t",
//           nombre: "TestName",
//           apellido: "TestApellido",
//           edad: "11",
//           alias: "TestAlias",
//           avatar: "https://loremflickr.com/640/480/nature"
//         }
//       },
//       {
//         mensaje: {
//           texto: "como estan?",
//           date: "01/01/21"
//         },
//         autor: {
//           id: "a@t",
//           nombre: "TestName",
//           apellido: "TestApellido",
//           edad: "11",
//           alias: "TestAlias",
//           avatar: "https://loremflickr.com/640/480/nature"
//         }
//       }
//     ],
//     autores: [
//       {
//         id: "a@t",
//         nombre: "TestName",
//         apellido: "TestApellido",
//         edad: "11",
//         alias: "TestAlias",
//         avatar: "https://loremflickr.com/640/480/nature"
//       },
//       {
//         id: "axel@ken",
//         nombre: "Axel",
//         apellido: "Ken",
//         edad: "29",
//         alias: "Axelken",
//         avatar: "https://loremflickr.com/640/480/business"
//       }
//     ]
// }





// // normalizar

// console.log('objeto normalizado')
// const orgNormalizado = normalize(historial, msj)


// const tamanoMensajeNorm = JSON.stringify(orgNormalizado).length



// // DESNORMALIZAR //////////////////////////////

// const orgDesnormalizado = denormalize(orgNormalizado.result, msj, orgNormalizado.entities)
// print(orgDesnormalizado)

// const tamanoMensajeDenorm = JSON.stringify(orgDesnormalizado).length
// const tamanoMensaje = JSON.stringify(historial).length
// console.log('longitud de obj original: ' + tamanoMensaje)
// console.log('longitud de obj normalizado: ' + tamanoMensajeNorm)
// console.log('longitud de obj desnormalizado: ' + tamanoMensajeDenorm)