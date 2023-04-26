import MessageRepo from './repos/chat.js'
const msjRepo = new MessageRepo()

async function guardar(obj) { 
    await msjRepo.save(obj)
}

async function listarTodas() {
    return await msjRepo.getAll()
}

async function getByMail(mail) {
    return await msjRepo.getByMail(mail)
}

export default {
    guardar,
    listarTodas,
    getByMail
}