import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})


export default {
    MongoKey: process.env.MAKEY,
    MongoUrl: process.env.MAURLMONGO,
    PORT: process.env.PORT,
    MODO: process.env.PersistenceMode
}