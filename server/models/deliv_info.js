// 쿼리편집 목적 파일

const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log("options : ", options)
    const {user_idx} = options
    let query = 'SELECT * FROM deliv_info '
    let values
    if (user_idx) { //WHERE 조건문 추가
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
    let query = 'INSERT INTO deliv_info SET ? '
    let values = options
    return await db.query({ 
        connection:connection,
        query:query,
        values:values
    })
} 

module.exports.delete = async (connection, options) => {
    console.log("options : ", options.idx)
    let query = 'DELETE FROM deliv_info WHERE deliv_info_idx= ?'
    // let values = idx
    return await db.query({ 
        connection:connection,
        query:query,
        values:options.deliv_info_idx
    })
    
} 

module.exports.update = async (connection, options) => {
    console.log("options : ", options)
    let query = 'UPDATE deliv_info SET ? WHERE deliv_info_idx = ? '
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options, options.deliv_info_idx] //나머지, 특정값
    })
    
} 

module.exports.multipleUpdate = async (connection, options) => {

    console.log("options : ", options)
    let query = 'UPDATE deliv_info SET'
    let list = options.list //포스트맨에서 넣어주는 형태가 list
    for (let i=0;i<list.length;i++){
        let value = list[i]
        if(i==list.length-1){
            query += ` base_address = CASE deliv_info_idx
                            WHEN ${value.deliv_info_idx}
                            THEN '${value.base_address}'
                            ELSE base_address 
                            END,
                        detail_address = CASE deliv_info_idx
                            WHEN ${value.deliv_info_idx}
                            THEN '${value.detail_address}'
                            ELSE detail_address 
                            END,
                        zipcode = CASE deliv_info_idx
                            WHEN ${value.deliv_info_idx}
                            THEN '${value.zipcode}'
                            ELSE zipcode
                            END 
                        `
                        // 마지막줄이라 END뒤에 콤마 없음
        } else {
            //첫번째부터 마지막 전까지 list를 위한 쿼리
            query += ` base_address = 
                            CASE deliv_info_idx
                            WHEN ${value.deliv_info_idx}
                            THEN '${value.base_address}'
                            ELSE base_address 
                            END,
                        detail_address = CASE deliv_info_idx
                            WHEN ${value.deliv_info_idx}
                            THEN '${value.detail_address}'
                            ELSE detail_address 
                            END,
                        zipcode = CASE deliv_info_idx
                            WHEN ${value.deliv_info_idx}
                            THEN '${value.zipcode}'
                            ELSE zipcode
                            END,
                            `
        }
    }
    console.log('sql : ',query)
    const {affectedRows} = await db.query({ //반영된 row가 몇개인지 (반영 잘 되었는지 확인 용)
        connection:connection,
        query:query,
        values:[options]
    })
    return affectedRows
    
} 

module.exports.multipleDelete = async (connection, options) => {
    console.log("options : ",options.idx_array)
    let query = 'DELETE FROM deliv_info WHERE deliv_info_idx IN (?)'
    // multiple 사용할 때 IN 사용하면 array로 활용 가능
    // 값이 여러개 들어갈 땐 (?)로 묶어줌 // = ? 하면 특정 값 하나만 적용
    return await db.query({ 
        connection:connection,
        query:query,
        values:[options.idx_array]
    })
    
} 