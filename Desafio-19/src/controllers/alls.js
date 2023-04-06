const getAlls = async (ctx) => {
    const { url, method } = await ctx.request
    ctx.body = `Ruta ${method} ${url} no está implementada`
}


export default {getAlls}