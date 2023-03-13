const socket = io()

socket.on('event_name', (data) => {
    console.log(data);
  });


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


function refreshProducs() {
    socket.emit('new-product', "Lista de productos modificada")
    return false
}


function userLogin() {
    const username = {
        username: document.getElementById("username").value,
    }
    socket.emit('new-user', username)
    return false
}


socket.on('login', data => {
    let contenido = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">Bienvenido ${data}</h2>
    <button onclick="location.href= '/logout'" class="btn btn-warning m-2 text-light">Desloguear</button>`
    document.getElementById("loginUser").innerHTML = contenido
})

socket.on('logout', data => {
    let contenido = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">Hasta Luego ${data}</h2>`
    document.getElementById("logoutUser").innerHTML = contenido
})

socket.on('signin', data => {
    let contenido = `${data}`
    document.getElementById("loginUser").innerHTML = contenido
})