var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/cart')
const goods_img_model = require('../models/goods_img')
const review_model = require('../models/review')
const goods_model = require('../models/goods')
const user_model = require('../models/user');
const { json } = require('express');

router.post('/', async function(req, res, next) {
    const body = req.body
    console.log('body : ', body)
    try {
        const connection = await db.beginTransaction()
        const goodsResult = await goods_model.getList({goods_idx:body.goods_idx})
        if(goodsResult.length == 0) {
            throw {status: 404, errorMessage : 'goods not found'}
        }
        const userResult = await user_model.getList({user_idx:body.user_idx})
        if(userResult.length == 0) {
            throw {status: 404, errorMessage : 'user not found'}
        }
        const result = await model.insert(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('error : ', err)
        next(err)
    }
})

router.put('/', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const result = await model.update(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('error : ', err)
        next(err) 
    }
});

  router.delete('/', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(connection, {cart_idx:body.cart_idx})
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('error : ', err)
        next(err) 
    }
  });

router.get('/', async function(req, res, next) {
    // const cart_idx = req.query.cart_idx
    const result = await model.getList(req.query)
    for (let i=0;i<result.length;i++){
        const imgResult = await goods_img_model.getList({goods_idx:result[i].goods_idx})
        result[i].images = imgResult //image 테이블 받아옴
        result[i].repr_img = imgResult.length>0 ? imgResult[0].img_path : '' //path설정
        const reviewResult = await review_model.getList({goods_idx:result[i].goods_idx})
        result[i].reviews = reviewResult //review 불러오기
        result[i].review_cnt = reviewResult.length //해당 goods의 review 갯수 확인
        let star_sum = 0
        for(let j=0;j<reviewResult.length;j++){ //별점합계 구하기
            star_sum += reviewResult[j].star
        }
        result[i].star_avg = reviewResult.length==0 ? 0 : star_sum/reviewResult.length //평균 별점
    }
    res.status(200).json({result})
});

module.exports = router;