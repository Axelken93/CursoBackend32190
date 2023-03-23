import axios from 'axios'

const urlGet = 'http://localhost:8080/productos/index'

axios(urlGet)
    .then(resp => {
        let data = resp.data
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })




const urlPost = 'http://localhost:8080/productos'


function enviarProducto() {
    let nuevoProducto = { title: 'Esfera', price: 222, thumbnail: 'EsferaFoto'}
    axios.post(urlPost, nuevoProducto)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

enviarProducto()
