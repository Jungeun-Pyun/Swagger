// 쿼리편집 목적 파일

const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    let query = `SELECT * FROM cart
                 LEFT JOIN goods ON goods.goods_idx = cart.goods_idx` //cart테이블에 goods의 특정 값을 함께 출력
    let values = []
    const keys = Object.keys(options) //options의 key값만 가져옴
    if(keys && keys.length>0){
        for(let i=0;i<keys.length;i++){
            if(i==0){
                query += ` WHERE ${keys[i]} = ? `
                values.push(options[keys[i]])
            } else {
                query += ` AND ${keys[i]} = ?`
                values.push(options[keys[i]])
            }
        }
    }
    return await db.query({ 
        // connection:connection,
        query:query,
        values:values
    })

    // console.log("options : ", options)
    // const {cart_idx} = options
    // let query = 'SELECT * FROM cart LEFT JOIN goods ON goods.goods_idx = cart.goods_idx '
    // let values
    // if (cart_idx) { //WHERE 조건문 추가
    //     query += 'WHERE cart_idx = ?'
    //     values = cart_idx
    // }
    // return await db.query({ //매개변수에 
    //     // connection:connection,
    //     query:query,
    //     values:values
    // })
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO cart SET ? '
    let values = options
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE cart SET ? WHERE cart_idx = ? '
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options, options.cart_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options.idx)
    let query = 'DELETE FROM cart WHERE cart_idx= ?'
    return await db.query({ 
        connection:connection,
        query:query,
        values:options.cart_idx
    })
    
} 
