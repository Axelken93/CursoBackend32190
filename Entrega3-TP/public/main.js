const socket = io()

function userLogin() {
    const username = {
        username: document.getElementById("username").value,
    }
    let data = [1,2,3,4,5]
    socket.emit('mensaje', data)
    //socket.emit('new-user', username)
    console.log("Estoy aca")
    return false
}

socket.on('prueba', pproducto => {
    let contenido = `<h2 style="color:black;" class="m-3 p-3 text-capitalize fw-bold">Bienvenido ${pproducto}</h2>
    <button onclick="location.href= '/logout'" class="btn btn-warning m-2 text-light">Desloguear</button>`
    document.getElementById("messages").innerHTML = contenido
})

socket.on('login', data => {
    let contenido = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">Bienvenido ${data}</h2>
    <button onclick="location.href= '/logout'" class="btn btn-warning m-2 text-light">Desloguear</button>`
    document.getElementById("loginUser").innerHTML = contenido
})

socket.on('logout', data => {
    let contenido = `<h2 style="color:white;" class="m-3 p-3 text-capitalize fw-bold">Hasta Luego ${data}</h2>`
    document.getElementById("logoutUser").innerHTML = contenido
})

// socket.on('signin', data => {
//     let contenido = `${data}`
//     document.getElementById("loginUser").innerHTML = contenido
// })