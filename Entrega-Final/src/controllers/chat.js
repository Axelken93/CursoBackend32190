import service from '../services/chat.js'

async function getMessagesByMail(req, res) {
    let {mail} = await req.params
    const mensajes = await service.obtenerMensajes(mail)
    res.json(mensajes)
}

async function getToMessages(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Entrega-Final/public/message.html')
}

async function postMessage(req, res) {
    let messageInfo = req.body
    let mensajeNuevo = await service.sumarMensaje(messageInfo)
    res.json(mensajeNuevo)
}

export default {
    getToMessages,
    postMessage,
    getMessagesByMail
}