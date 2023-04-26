async function goToLogin(req, res) {
    const url = req.url
    const method = req.method
    res.json({URL: url, Metodo: method, Error: "Realice un metodo POST ingresando Email y Password"})
}

async function goToHome (req, res) {
    res.redirect("/productos")
}

async function postLogin (req, res) {
    const username = req.body.username
    req.session.user = username
    res.redirect("/productos")
}
async function failLogin(req, res) {
    res.json({Error: "Usted ha ingresado mal sus credenciales"})
}

async function goToRegister(req, res) {
    const url = req.url
    const method = req.method
    res.json({URL: url, Metodo: method, Error: "Realice un metodo POST ingresando Nombre, Mail, Password, Direccion y telefono"})
}

async function failRegister(req, res) {
    res.json({Error: "Usted ha ingresado mal algun dato. Asegurese de ingresar Nombre, Mail, Password, Direccion y telefono"})
}

async function goToLogout(req, res) {
    res.json({Status: "Usted ha cerrado sesion"})
}

export default {
    goToLogin,
    goToHome,
    postLogin,
    failLogin,
    goToRegister,
    failRegister,
    goToLogout
}