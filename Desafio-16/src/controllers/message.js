import service from '../services/message.js'

async function goToMessage(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-16/src/public/message.html')
}

async function postMessage(req, res) {
    let messageInfo = req.body
    await service.sumarMensaje(messageInfo)
}

export default {
    goToMessage,
    postMessage
}