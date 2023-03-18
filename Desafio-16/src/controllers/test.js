import service from '../services/test.js'

async function getFakers(req, res) {
    const products = await service.obtenerFakers()
    res.render('index', {products})
}

export default {
    getFakers
}