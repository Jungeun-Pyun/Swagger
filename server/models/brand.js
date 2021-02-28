// 쿼리편집 목적 파일

const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    const {brand_idx} = options
    let query = 'SELECT * FROM brand '
    let values
    if (brand_idx) { //WHERE 조건문 추가
        query += 'WHERE brand_idx = ?'
        values = brand_idx
    }
    return await db.query({ //매개변수에 
        // connection:connection,
        query:query,
        values:values
    })
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO brand SET ? '
    let values = options
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE brand SET ? WHERE brand_idx = ? '
    return await db.query({
        connection:connection,
        query:query,
        values:[options, options.brand_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options.idx)
    let query = 'DELETE FROM brand WHERE brand_idx= ?'
    return await db.query({
        connection:connection,
        query:query,
        values:options.brand_idx
    })
    
} 