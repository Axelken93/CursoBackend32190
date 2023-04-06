import service from '../services/products.js'
import middleware from '../routes/middlewares/activeSession.js'
import fs from 'fs'


async function goToHome(ctx) {
    if(middleware.haySession) {
        ctx.type = 'html';
        ctx.body = await fs.promises.readFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-16/src/public/index.html', 'utf8');
    } else {
        await ctx.redirect('/login')
    }
};

async function getProducts(ctx) {
    if(middleware.haySession) {
        const products = await service.obtenerProductos()
        await ctx.render('index', {products})
    } else {
        await ctx.redirect('/login')
    }
}

async function postProduct(ctx) {
    let productInfo = await ctx.request.body
    await service.sumarProducto(productInfo)
    await ctx.redirect('/productos')
}

export default {
    goToHome,
    getProducts,
    postProduct
}