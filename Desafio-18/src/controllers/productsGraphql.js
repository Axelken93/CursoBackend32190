import service from '../services/products.js'

import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

const schema = buildSchema(`
type Producto {
    title: String,
    price: Int,
    thumbnail: String,
    id: ID!
}
input ProductoInput {
    title: String,
    price: Int,
    thumbnail: String
}
type Query {
    getProducts: [Producto]
}
type Mutation {
    createProduct(datos: ProductoInput): Producto
}
`)


const GraphqlController = await graphqlHTTP({
    schema: schema,
    rootValue: {
        getProducts: async () => await service.obtenerProductos(),
        createProduct: async ({ datos }) => await service.sumarProducto(datos)
    },
    graphiql: true
})

export default GraphqlController