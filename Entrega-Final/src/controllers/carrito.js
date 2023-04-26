import service from '../services/carrito.js'

async function getCharts(req, res) {
    const carrito = await service.obtenercarrito()
    res.json(carrito)
}

async function getChartId(req, res) {
    let {num} = req.params
    const carrito = await service.obtenerCarritoId(parseInt(num))
    res.json(carrito)
}

async function postChart(req, res) {
    let carritoInfo = req.body
    let response = await service.agregarCarrito(carritoInfo)
    res.json(response)
}

async function deleteChart(req, res) {
    let eliminado = await service.eliminarCarrito()
    res.json(eliminado)
}

async function deleteChartId(req, res) {
    let {num} = req.params
    let eliminado = await service.eliminarCarritoPorId(parseInt(num))
    res.json(eliminado)
}

async function putChart(req, res) {
    let {num} = req.params
    let nuevoCarrito = req.body
    let modificado = await service.modificarCarrito(parseInt(num),nuevoCarrito)
    res.json(modificado)
}

export default {
    getCharts,
    postChart,
    deleteChart,
    getChartId,
    deleteChartId,
    putChart
}
