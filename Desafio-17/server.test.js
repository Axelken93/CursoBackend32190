import { strictEqual, deepStrictEqual } from "assert";
import axios from 'axios'

//const enviarNumero = numero => 
function saveProducts(obj) {
    axios.post('http://localhost:8080/productos', {obj})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })
    return obj
}

async function getProducts() {
    const response = await axios.get('http://localhost:8080/productos/index')
    return response.data
}
getProducts()

let prod = [{title: 'Circulo', price: 111, thumbnail: 'axelfoto', id: 1 },
    {title: 'axel',price: 99999,thumbnail: 'https://www.iconfinder.com/icons/211717/square_icon',id: 2 },
    {title: 'asdasd',price: 2,thumbnail: 'https://cdn.pixabay.com/photo/2017/09/21/20/28/crown-of-thorns-2773399_1280.png',id: 3},
    {title: 'probandoNombre',price: 999,thumbnail: 'ProbandoFoto', id: 4},
    {title: 'joda', price: 99, thumbnail: 'asdsadasd', id: 5 },
    {title: 'Test Desafio 16', price: 88, thumbnail: 'Sin foto', id: 6 },
    {title: 'TestMongoLogin',price: 111,thumbnail: 'asdasdasd',id: 7},
    {title: 'Esfera', price: 222, thumbnail: 'EsferaFoto', id: 9 }]




describe("Comprobando el funcionamiento del servidor", function() {

    it("Recibir todos los productos", async function() {
        const productos = await getProducts()
        strictEqual(productos.length, 8)
        deepStrictEqual(productos, prod)
    })

    it("Guardar un nuevo producto", async function() {
        let nuevoProducto ={title: 'Romboide', price: 333, thumbnail: 'RomboideFoto'}
        await saveProducts(nuevoProducto)
        prod.push(nuevoProducto)
        strictEqual(prod.length, 9)
    })

})