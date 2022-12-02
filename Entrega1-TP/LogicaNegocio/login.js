let administrador = true

function onlyAdmin(req, res, next) {
    if (administrador) { // si es admin
    next()
    } else { // si no es admin, devuelvo el error
    res.status(401).json({error:-1,descripcion:`Ruta ${req.originalUrl} metodo ${req.method} no autorizado`});
    }
}

module.exports = {
    onlyAdmin,
    administrador,
};


module.exports= administrador