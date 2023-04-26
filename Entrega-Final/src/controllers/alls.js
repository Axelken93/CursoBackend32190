const getAlls = async (req, res) => {
    const { url, method } = req
    res.send(`Ruta ${method} ${url} no esta implementada`)

}

export default getAlls