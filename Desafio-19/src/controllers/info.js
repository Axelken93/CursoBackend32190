import os from 'os'

async function getInfo(ctx) {
    const info = {
        Puerto: process.env.PORT || 8080,
        argEntrada: process.argv.slice(2),
        pathEjecucion: process.execPath,
        sistema: process.platform,
        idProceso: process.pid,
        version: process.version, 
        carpetaProyecto: process.cwd(),
        memoria: process.memoryUsage().rss,
        numProcesadores: os.cpus().length
    }

    await ctx.render('info', {info})
}

export default {
    getInfo
}