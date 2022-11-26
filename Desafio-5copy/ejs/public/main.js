const socket = io()

socket.on('prueba', data => {
        const html = data.map(p => {
            return `            <tr>
                <td>${p.id}.</td>
                <td>${p.title}</td>
                <td>${p.price}</td>
                <td><img src=${p.thumbnail} style="width: 30px;" ></img></td>
                </tr>`
        })
        .join("</br>")

        document.getElementById("listaProductos").innerHTML = html
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
