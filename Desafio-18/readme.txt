/-------------------------------------/
/------Desafio Nro 18 - GraphQL-------/
/-------------------------------------/

Se creo un nuevo endpoint bajo las consignas de capas de ruteo, controller y service en GraphQL >>
'/graphql'


Se ejecutaron las siguientes query de forma satisfactoria:
query {
  getProducts{
    title
    price
    thumbnail
    id
  }
}


mutation {
  createProduct(datos: { title: "Funciono", price: 456, thumbnail: "GraphQL" }) {
    title
    price
    thumbnail
    id
  }
}
