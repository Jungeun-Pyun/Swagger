// 쿼리편집 목적 파일
const {disable} = require("debug")
const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    const {
        user_idx,
        user_id
    } = options
    let query = 'SELECT * FROM user '
    // let query = "SELECT * FROM user 1=1" 하고 나머지 다 AND로 해도 가능
    let values = []
    let keys = Object.keys(options)
    console.log('keys : ', keys) // keys :  [ 'user_id' ]
    if (user_idx) { 
        query += 'WHERE user_idx = ?'
        values.push(user_idx)
    }
    if(user_id) {
        if(keys.length == 1){
            query += 'WHERE user_id = ?'
            values.push(user_id)
        } else {
        query += 'AND user_id = ?'
        values.push(user_id)
        }
    }
    return await db.query({ 
        // connection:connection,
        query:query,
        values:values
    })
    // return result
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO user SET ? '
    let values = options
    return await db.query({ //결과값 나오게 하려면 return
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE user SET ? WHERE user_idx = ? '
    const result=await db.query({
        connection:connection,
        query:query,
        values:[options, options.user_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options)
    let query = 'DELETE FROM user WHERE user_idx= ?'
    const result=await db.query({ 
        connection:connection,
        query:query,
        values:options.user_idx
    })
} 
