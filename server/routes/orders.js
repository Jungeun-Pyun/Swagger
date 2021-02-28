var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/orders')
const util = require('../components/util')
const goods_model = require('../models/goods')
const user_model = require('../models/user')
const goods_img_model = require('../models/goods_img')
const review_model = require('../models/review')

router.post('/', async function(req, res, next) {
    const body = req.body
    try {
        console.log('body : ', body)
        const connection = await db.beginTransaction()
        const goodsResult = await goods_model.getList({goods_idx:body.goods_idx})
        if(goodsResult.length == 0){
            throw{status : 404, errorMessage : 'goods not found'}
        }
        const userResult = await user_model.getList({user_idx:body.user_idx})
        if(userResult.length == 0){
            throw{status : 404, errorMessage : 'user not found'}
        }
        const order_date = util.getCurrentTime()
        body.order_date = order_date
        const result = await model.insert(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
})


router.put('/', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const order_date = util.getCurrentTime()
        body.order_date = order_date
        const result = await model.update(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
});

router.delete('/', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(connection, {orders_idx:body.orders_idx})
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
});

router.get('/', async function(req, res, next) {
    try {
        const result = await model.getList(req.query)
        for(let i=0;i<result.length;i++) {
          const imgResult = await goods_img_model.getList({goods_idx:result[i].goods_idx})
          result[i].images=imgResult
          result[i].repr_img=imgResult.length>0 ? imgResult[0].img_path : '' //이미지 없을 때 default 이미지 삽입
  
          const reviewResult = await review_model.getList(
            {goods_idx:result[i].goods_idx}
          )
          result[i].reviews=reviewResult
          result[i].review_cnt=reviewResult.length
          let star_sum = 0
          for (let j=0;j<reviewResult.length;j++) {
            star_sum += reviewResult[j].star
          }
          result[i].review_avg = reviewResult.length==0 ? 0 : star_sum/reviewResult.length
        }
        res.status(200).json({result})
    } catch (err){
      console.log('err : ',err)
      next(err)
    }
  });

module.exports = router;