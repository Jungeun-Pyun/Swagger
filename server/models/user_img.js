// 쿼리편집 목적 파일

const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    const {user_idx} = options
    let query = 'SELECT * FROM user_img '
    let values
    if (user_idx) {
        query += 'WHERE user_idx = ?'
        values = user_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO user_img SET ? '
    let values = options
    return await db.query({ 
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.multipleInsert = async (connection, options) => {
    let query = `INSERT INTO user_img
                                (
                                    user_idx,
                                    img_path
                                )
                VALUES ?`
    return await db.query({
        connection:connection,
        query:query,
        values:[options]
    })
}

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE user_img SET ? WHERE user_img_idx = ? '
    return await db.query({
        connection:connection,
        query:query,
        values:[options, options.user_img_idx]
    })
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options)
    let query = 'DELETE FROM user_img WHERE user_img_idx= ?'
    return await db.query({
        connection:connection,
        query:query,
        values:options.user_img_idx
    })
} 
