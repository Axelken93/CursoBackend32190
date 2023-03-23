import MessageRepo from './repos/message.js'
const msjRepo = new MessageRepo()

async function guardar(obj) {
    let newMsj = obj
    await msjRepo.save(newMsj)
}

async function listarTodas() {
    return await msjRepo.getAll()
}

export default {
    guardar,
    listarTodas
}