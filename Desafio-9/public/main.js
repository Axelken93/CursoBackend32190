const socket = io()


//Creo una funcion para concatenar el contendio y armar tabla Productos
function crearHtml(data) {
    let contenido = `<div class="table-responsive">
    <table class="table table-light">
        <tr style="color: blue;"> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>`
    
    for (e of data) {
        contenido += `    <tr>
        <td>${e.title}</td>
        <td>${e.price}</td>
        <td><img src=${e.thumbnail} style="width: 30px;" ></img></td>
    </tr>`
    }
    
    contenido += `</table>
    </div>`
    return contenido
}

socket.on('prueba', data => {
    contenido = crearHtml(data)
    document.getElementById("listaProductos").innerHTML = contenido
})

//Escucho el nuevo mensaje y lo inserto en el html
socket.on('message', data => {
    const html = data.map(msj => {
        return `<div class="rounded col-3 text-break" style="background: white">
        <div><strong style="color: blue">${msj.autor.id}</strong><p style="color: brown">[${msj.mensaje.date}]</p></div>
        <em style="color: green">${msj.mensaje.texto}</em>
        </div>`
    })
    .join("<br>")

    document.getElementById("messages").innerHTML = html
})

function refreshProducs() {
    socket.emit('new-product', "Lista de productos modificada")
    return false
}


//Emito el nuevo mensaje
function addMessage() {
    const message = {
        id: document.getElementById("email").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        alias: document.getElementById("alias").value,
        avatar: document.getElementById("avatar").value,
        texto: document.getElementById("text").value,
        date: new Date().toLocaleString()
    }

    socket.emit('new-message', message)
    return false
}


//Porcentaje de conversion
socket.on('conver', data => {
    console.log(data)
    let contenido = `<p>Porcentaje de compresión: ${data}%</p>`
    console.log(contenido)
    document.getElementById("conversion").innerHTML = contenido
})






// const fs = require('fs')

//Porcentaje de conversion
// function insertarConversion(fileName) {
//     // const read = JSON.parse(fs.readFileSync(`./public/${fileName}`, 'utf-8'))
//     // let cantMensajes = read.entities.mensaje["1000"].mensajes.length
//     let conversion = `${porcentajeConver}`
//     // let conversion = "11"

//     let contenido = `<p>Porcentaje de conversión: ${conversion}%</p>`
//     document.getElementById("conversion").innerHTML = contenido


//     // if (cantMensajes > 0) {
//     //     let conversion = porcentajeConversion(read)
//     //     let conversion2 = `${conversion}`

//     //     let contenido = `<p>Porcentaje de conversión: ${conversion2}%</p>`
//     //     document.getElementById("conversion").innerHTML = contenido

//     // } else {
//     //     return console.log("Aun no hay mensajes para calcular la conversión")
//     // }
// }

// //insertarConversion('historialMensajes.txt')
