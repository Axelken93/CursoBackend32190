const socket = io()

//Creo una funcion para concatenar el contendio y armar una tabla. 
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

socket.on('message', data => {
    const html = data.map(msj => {
        return `<div class="rounded col-3 text-break" style="background: white">
        <div><strong style="color: blue">${msj.email}</strong><p style="color: brown">[${msj.date}]</p></div>
        <em style="color: green">${msj.text}</em>
        </div>`
    })
    .join("<br>")

    document.getElementById("messages").innerHTML = html
})

function refreshProducs() {
    socket.emit('new-product', "Lista de productos modificada")
    return false
}

function addMessage() {
    const message = {
        email: document.getElementById("email").value,
        text: document.getElementById("text").value,
        date: new Date().toLocaleString()
    }

    socket.emit('new-message', message)
    return false
}
