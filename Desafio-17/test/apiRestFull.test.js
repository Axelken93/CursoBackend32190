import supertest from 'supertest';
import chai from 'chai';

const request = supertest('http://localhost:8080')
const expect = chai.expect


let prod = [{title: 'Circulo', price: 111, thumbnail: 'axelfoto', id: 1 },
    {title: 'axel',price: 99999,thumbnail: 'https://www.iconfinder.com/icons/211717/square_icon',id: 2 },
    {title: 'asdasd',price: 2,thumbnail: 'https://cdn.pixabay.com/photo/2017/09/21/20/28/crown-of-thorns-2773399_1280.png',id: 3},
    {title: 'probandoNombre',price: 999,thumbnail: 'ProbandoFoto', id: 4},
    {title: 'joda', price: 99, thumbnail: 'asdsadasd', id: 5 },
    {title: 'Test Desafio 16', price: 88, thumbnail: 'Sin foto', id: 6 },
    {title: 'TestMongoLogin',price: 111,thumbnail: 'asdasdasd',id: 7}]

// Comenzamos la descripción de los tests
describe('API Tests -> Productos', () => {
  // Testeamos la ruta GET '/'
  describe('GET /productos/index', () => {
    it('Debería retornar status 200', done => {
      request.get('/productos/index')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('Debería recibir todos los productos', done => {
        request.get('/productos/index')
          .end((err, res) => {
            // console.log('RECIBIDO')
            // console.log(res.body)
            // console.log('BASE DATOS')
            // console.log(prod)
            expect(res.body).to.eql(prod);
            done();
          });
      });

  });

  // Testeamos la ruta POST '/users'
  describe('POST /productos', () => {
    it('Debería crear un nuevo producto', done => {

        let nuevoProducto = {title: 'Esfera', price: 222, thumbnail: 'EsferaFoto', id: 9 }
        prod.push(nuevoProducto)
        request.post('/productos')
            .send(nuevoProducto)
            .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(nuevoProducto.title).to.eql(prod[7].title);
            expect(nuevoProducto.price).to.eql(prod[7].price);
            done();
            });
    });
  });
});
