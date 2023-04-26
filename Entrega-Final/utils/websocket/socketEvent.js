import message from '../../src/persistence/chat.js'

export default async function socketEvent(io) {
    io.on('connection', (socket) => {
        console.log("un cliente se ha conectado")
    
        message.listarTodas()
            .then((m) => {
                socket.emit('message', m)
            })
    
        socket.on('new-message', async data => {
            await message.guardar(await data)
            let newMsj = await message.listarTodas()
            io.sockets.emit('message', newMsj)
        });
    })
}