import service from '../services/orden.js'

async function finishOrder(req, res) {
    const carrito = await service.finishOrder()
    res.json(carrito)
}

export default {
    finishOrder
}