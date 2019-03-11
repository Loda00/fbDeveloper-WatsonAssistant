const { Pool } = require('pg')
const { config } = require('../connection') 

class Pedido {

    constructor() {
        this.pool = new Pool(config)
    }

    async pricePizza () {
        
        const client = await this.pool.connect()
        let res = undefined
        try {

            res = await client.query(`select * from tb_pizza where `)
            
        } catch (error) {
            
        }
    }
}

module.exports = {
    Pedido
}