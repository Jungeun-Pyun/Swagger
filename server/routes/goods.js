var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/goods')
const goods_img_model = require('../models/goods_img')
const review_model = require('../models/review')

router.post('/', async function(req, res, next) {
    const body = req.body
    // body = { //상품을 등록할 때 마다 brand와 category를 등록하는 것은 좋지 않음. brand랑 category를 미리 지정해주는 것이 좋음
    //         "goods_name" : "goods2",
    //         "goods_price" : 20000,
    //         "brand_idx" :1,
    //         "category_idx":1,
    //         "images" : ["images/goods/1/background.jpeg"]
    // }
    const images = body.images
    delete body.images //goods 테이블엔 image path 넣어주지 않음
    try {
        const connection = await db.beginTransaction()
        const result = await model.insert(connection, body)
        const goods_idx = result.insertId //auto increment로 들어가는 유저아이디idx를 받아옴

        if(images && images.length>0){
          for(let i=0;i<images.length;i++) {//여러개 이미지를 넣는 코드
            let imgObj = {
                          goods_idx:goods_idx,
                          img_path:images[i]
                         }
            await goods_img_model.insert(connection, imgObj)
          }
        }

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
        const result = await model.delete(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
      console.log('err : ',err)
      next(err)
    }
  });

router.get('/', async function(req, res, next) {
  try {
      const query = req.query
      const result = await model.getList(query)
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