import service from '../services/test.js'

async function getFakers(ctx) {
    const products = await service.obtenerFakers()
    await ctx.render('index', {products})
}

export default {
    getFakers
}