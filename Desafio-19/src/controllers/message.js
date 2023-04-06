import service from '../services/message.js'
import fs from 'fs'

async function goToMessage(ctx) {
    ctx.type = 'html';
    ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-16/src/public/message.html', 'utf8');
};

async function postMessage(ctx) {
    let messageInfo = await ctx.request.body
    await service.sumarMensaje(messageInfo)
    await ctx.redirect('/mensajes')
}

export default {
    goToMessage,
    postMessage
}