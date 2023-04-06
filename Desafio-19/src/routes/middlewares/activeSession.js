import fs from 'fs'

async function haySession(){
    let usuario = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', 'utf8');
    if (usuario.length === 0) {
        return false
    } else {
        return true
    }
}

async function cacheSession(){
    let usuario = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', 'utf8');
    return usuario
}

async function eliminarSession(ctx, next){
    await fs.promises.writeFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-19/src/persistence/db/userCache.txt', "");
    next()
}

async function activeSession(ctx) {
    let sesionActiva = await haySession()
    if (!sesionActiva) {
        await ctx.redirect('/login')
    }
}


export default {
    haySession,
    cacheSession,
    eliminarSession,
    activeSession
}