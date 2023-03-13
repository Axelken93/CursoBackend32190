async function goToLogin(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/login.html')
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
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/faillogin.html')
}

async function goToRegister(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/register.html')
}

async function failRegister(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/failregister.html')
}

async function goToLogout(req, res) {
    res.sendFile('C:/Users/flopi/Desktop/Axel/Programacion/Curso-CoderHouse/Backend/TP/Desafios/Desafio-15/src/public/logout.html')
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