const socket = io()

function activar() {
    let data = [1,2,3,4,5]
    socket.emit('mensaje', data => console.log(data))
}

activar()

socket.on('prueba', pproducto => {
    let contenido = `<h2 style="color:black;" class="m-3 p-3 text-capitalize fw-bold">Bienvenido ${pproducto}</h2>
    <button onclick="location.href= '/logout'" class="btn btn-warning m-2 text-light">Desloguear</button>`
    document.getElementById("messages").innerHTML = contenido
})