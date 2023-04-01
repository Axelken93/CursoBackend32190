import os from 'os'

async function getInfo(req, res) {
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

    res.render('info', {info})
}

export default {
    getInfo
}