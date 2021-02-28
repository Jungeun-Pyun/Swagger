
const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    try{
        // const {
        //     review_idx,
        //     goods_idx,
        //     user_idx
        // } = options
        let query = 'SELECT * FROM review '
        let values = []
        const keys = Object.keys(options) //key만 빼오는 모듈
        console.log("keys : ", keys)
        if(keys && keys.length > 0){
            for(let i=0;i<keys.length;i++){
                if (i==0) { //WHERE 조건문 추가
                    query += `WHERE ${keys[i]} = ?`
                    values.push(options[keys[i]]) //options.keys[i]는 구문상 안됨...ㅠ
                }else{
                    query += `AND ${keys[i]} = ?`
                    values.push(options[keys[i]]) 
                }
            }
        }
            return await db.query({
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
    let query = 'INSERT INTO review SET ? '
    let values = options
    return await db.query({ 
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE review SET ? WHERE review_idx = ? '
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options, options.review_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options)
    let query = 'DELETE FROM review WHERE review_idx= ?'
    return await db.query({ 
        connection:connection,
        query:query,
        values:options.review_idx
    })
    
} 

