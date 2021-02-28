// 쿼리편집 목적 파일

const db = require('../components/db')

module.exports.getList = async (options) => {
    console.log("options : ", options)
    let query = `SELECT * FROM orders 
                LEFT JOIN goods ON goods.goods_idx = orders.goods_idx`
    let values=[]
    const keys = Object.keys(options)
    console.log("keys :",keys)
    console.log("options :",options)

    if (keys && keys.length > 0) {
        for(let i=0;i<keys.length;i++){
            values.push(options[keys[i]]) //goods_idx인경우 column명이 바뀌기 때문에 push를 먼저 해줌
            keys[i] == 'goods_idx' ? keys[i]= 'goods.goods_idx' : keys[i] //ambiguous 에러 방지
            if(i==0){
                query += ` WHERE ${keys[i]} = ?` //? 빼먹지 말기!
                // values.push(options[keys[i]])
            } else {
                query += ` AND ${keys[i]} = ?`
                // values.push(options[keys[i]])
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
    let query = 'INSERT INTO orders SET ? '
    let values = options
    return await db.query({ 
        connection:connection,
        query:query,
        values:values
    })
} 


module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE orders SET ? WHERE orders_idx = ? '
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options, options.orders_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options)
    let query = 'DELETE FROM orders WHERE orders_idx= ?'
    return await db.query({ 
        connection:connection,
        query:query,
        values:options.orders_idx
    })
} 

