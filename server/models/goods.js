const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    try{
        const {goods_idx} = options
        let query = `SELECT * FROM goods 
                    LEFT JOIN brand ON goods.brand_idx = brand.brand_idx
                    LEFT JOIN category ON goods.category_idx = category.category_idx
                    `
        let values
        if (goods_idx) {
            query += ' WHERE goods_idx = ?'
            values = goods_idx
        }
        return await db.query({ //매개변수에 
            // connection:connection,
            query:query,
            values:values
        })
    } catch (err) {
        throw new Error(err)
    }
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO goods SET ? '
    let values = options
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE goods SET ? WHERE goods_idx = ? '
    return await db.query({
        connection:connection,
        query:query,
        values:[options, options.goods_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options.idx)
    let query = 'DELETE FROM goods WHERE goods_idx= ?'
    return await db.query({ 
        connection:connection,
        query:query,
        values:options.goods_idx
    })
    
} 
