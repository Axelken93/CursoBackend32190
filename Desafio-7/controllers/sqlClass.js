const knex = require('knex')

class ClienteSQL {
    constructor(options, tableName) {
        this.knex = knex(options)
        this.tableName = tableName
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists(`${this.tableName}`)
            .finally(() => {
                return this.knex.schema.createTable(`${this.tableName}`, table => {
                    table.increments('id').primary()
                    table.string('title', 99).notNullable()
                    table.integer('price').notNullable()
                    table.string('thumbnail', 99).notNullable()
                })
            })
    }

    crearTablaMensaje() {
        return this.knex.schema.dropTableIfExists(`${this.tableName}`)
        .finally(() => {
            return this.knex.schema.createTable(`${this.tableName}`, table => {
                    table.increments('id').primary()
                    table.string('email', 99).notNullable()
                    table.string('text',1000).notNullable()
                    table.date('date', 99).notNullable()
                })
            })
    }

    insertarProductos(productos) {
        return this.knex(`${this.tableName}`).insert(productos)
    }

    listarProductos() {
        return this.knex(`${this.tableName}`).select('*')
    }

    borrarProductos(id) {
        return this.knex.from(`${this.tableName}`).where('id', '=', id).del()
    }

    actualizarPrecio(id, precio) {
        return this.knex.from(`${this.tableName}`).where('id', '=', id).update({price: precio})
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = {
    ClienteSQL,
};
