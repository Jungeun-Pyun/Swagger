// 쿼리편집 목적 파일

const { query } = require('express')
const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    const {goods_idx} = options
    let query = 'SELECT * FROM goods_img '
    let values
    if (goods_idx) { 
        query += 'WHERE goods_idx = ?'
        values = goods_idx
    }
    return await db.query({
        // connection:connection,
        query:query,
        values:values
    })
} 


module.exports.insert = async (connection, options) => {
    console.log("options : ", options)
    let query = 'INSERT INTO goods_img SET ? '
    let values = options
    return await db.query({
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE goods_img SET ? WHERE goods_img_idx = ? '
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options, options.goods_img_idx]
    })
    
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options.idx)
    let query = 'DELETE FROM goods_img WHERE goods_img_idx= ?'
    let values = [options.goods_img_idx]
    if (idx_array) {
        whereClause += ' AND goods_img_idx IN (?)'
        values.push(idx_array)
    }

    return await db.query({
        connection:connection,
        query:query,
        values:values
    })  
} 

module.exports.multipleInsert = async (connection, options) => {
    let query=`INSERT INTO goods_img
                            (
                                goods_idx,
                                img_path
                            )
                VALUES ?`
    return await db.query({
        connection:connection,
        query:query,
        values:[options]
    })
}