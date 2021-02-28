// 쿼리편집 목적 파일

const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    const {category_idx} = options
    let query = 'SELECT * FROM category '
    let values
    if (category_idx) { //WHERE 조건문 추가
        query += 'WHERE category_idx = ?'
        values = category_idx
    }
    return await db.query({ //매개변수에 
        // connection:connection,
        query:query,
        values:values
    })
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO category SET ? '
    let values = options
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE category SET ? WHERE category_idx = ? '
    return await db.query({
        connection:connection,
        query:query,
        values:[options, options.category_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options.idx)
    let query = 'DELETE FROM category WHERE category_idx= ?'
    return await db.query({
        connection:connection,
        query:query,
        values:options.category_idx
    })
    
} 