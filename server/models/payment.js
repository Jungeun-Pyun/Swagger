
const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log('options :', options)
    let query = `SELECT payment.*, orders.goods_idx, user.user_idx FROM payment
                 LEFT JOIN orders ON orders.orders_idx = payment.orders_idx
                 LEFT JOIN goods ON goods.goods_idx = orders.goods_idx
                 LEFT JOIN user ON user.user_idx = orders.user_idx`
    let values = [];
    const keys = Object.keys(options)
    if(keys && keys.length > 0) {
        for(let i=0;i<keys.length;i++){
            values.push(options[keys[i]])
            keys[i] == 'orders_idx' ? keys[i] = 'payment.orders_idx' : keys[i]
            keys[i] == 'user_idx' ? keys[i] = 'user.user_idx' : keys[i]
            if(i==0) {
                query += ` WHERE ${keys[i]} = ?`
            } else {
                query += ` AND ${keys[i]} = ?`
            }
        }
    }
    return await db.query({ 
        // connection:connection,
        query:query,
        values:values
    })
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO payment SET ? '
    let values = options
    return await db.query({ 
        connection:connection,
        query:query,
        values:values
    })
} 



module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE payment SET ? WHERE payment_idx = ? '
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options, options.payment_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options)
    let query = 'DELETE FROM payment WHERE payment_idx= ?'
    return await db.query({ 
        connection:connection,
        query:query,
        values:options.payment_idx
    })
    
} 

