const socket = io()

function crearHtml(data) {
    let contenido = `<div class="table-responsive">
    <table class="table table-dark">
        <tr style="color: yellow;"> <th>Nombre</th> <th>Apellido</th></tr>`
    
    for (e of data) {
        contenido += `    <tr>
        <td>${e.author}</td>
        <td>${e.text}</td>
    
    </tr>`
    }
    
    contenido += `</table>
    </div>`
    
    document.getElementById("id1").innerHTML = contenido
}


socket.on('messages', data => {
    crearHtml(data)
})




