const socket = io()

socket.on('message', data => {
    const html = data.map(msj => {
        console.log(msj)
        return `<div class="rounded col-3 text-break" style="background: white">
        <div><strong style="color: blue">${msj.mail}</strong><p style="color: brown">[${msj.fecha}]</p></div>
        <em style="color: green">${msj.texto}</em>
        </div>`
    })
    .join("<br>")

    document.getElementById("messages").innerHTML = html
})

function addMessage() {
    const message = {
        mail: document.getElementById("mail").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        texto: document.getElementById("text").value,
        fecha: new Date().toLocaleString()
    }
    
    socket.emit('new-message', message)
    return false
}