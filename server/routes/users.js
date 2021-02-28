var express = require('express');
var router = express.Router();
const db = require('../components/db')
const model = require('../models/user')
const user_img_model = require('../models/user_img')
const deliv_info_model = require('../models/deliv_info')
const crypto = require('../components/crypto')

router.post('/signup', async function(req, res, next) {
  const body = req.body
  console.log('body : ', body)
  // body = {
  //   "user_id":"test10",
  //   "user_name":"test_name",
  //   "user_pwd":"123123",
  //   "images":["images/1/background.jpeg", "images/2/스크린샷 2021-01-31 오후 6.25.57.png"], //이미 업로드된 이미지라고 가정함
  //   "deliv_info" : [ //객체형태로 구성
  //     {
  //       "base_address":"서울시 한남동", //기본주소
  //       "detail_address":"한남더힐", //상세주소
  //       "zipcod":"12345" //우편번호
  //     },
  //     {
  //       "base_address":"서울시 노원구",
  //       "detail_address":"아파트",
  //       "zipcod":"78901"
  //     }
  //   ]

  // }

  try {
      const connection = await db.beginTransaction() //await이 있으면 무조건 async 들어가야함

      const images = body.images
      const deliv_info = body.deliv_info
      delete body.images //There are no colums for images and deliv_info in users table
      delete body.deliv_info

      //user id duplicate check
      const usersResult = await model.getList({user_id:body.user_id})
      if(usersResult.length > 0){
        throw {status: 409, errorMessage:"Duplicate user id"}
      }

      const {salt, encodedPw} = crypto.createPasswordPbkdf2(body.user_pwd)
      console.log('salt length : ', salt.length)
      console.log('encodedPw length : ', encodedPw.length)
      body.salt = salt
      body.user_pwd = encodedPw
      
      const result = await model.insert(connection, body)
      //get userId
      const user_idx = result.insertId //auto increment로 들어가는 유저아이디idx를 받아옴
      if(images && images.length > 0) { //if문 넣어주지 않으면 image랑 deliv_info 없을 때 에러 발생
        // for(let i=0;i<images.length;i++) {//여러개 이미지를 넣는 코드
        //   let imgObj = {
        //     user_idx:user_idx,
        //     img_path:images[i]
        //   }
        //   await user_img_model.insert(connection, imgObj)
        // }

        let imagesArray = []
        for(let i=0;i<images.length;i++){
          imagesArray.push([
            user_idx,
            images[i]
          ])
        }
        await user_img_model.multipleInsert(connection, imagesArray)
      }

    if(deliv_info && deliv_info.length > 0) {
      for(let i=0;i<deliv_info.length;i++) {//여러개 이미지를 넣는 코드
        let diObj = deliv_info[i]
        diObj.user_idx = user_idx
        await deliv_info_model.insert(connection, diObj) //insert를 할 때 시간이 걸려서 데이터를 다 올리지 않고 넘어가는 것을 방지하기 위해서 await 사용 
      }
    }
      await db.commit(connection)
      res.status(200).json({result})
      } catch (err){
        console.log('err : ',err)
        next(err)
      }
  })


router.post('/signin', async (req, res, next) => {
  console.log('signin')
  const body = req.body
  console.log('body : ', body)
  try{
    const result = await model.getList({user_id:body.user_id})
    console.log("result :",result)
    if(result.length == 0){
      throw{status: 404, errorMessage: 'User not found'}
    }
    let newResult = result[0]
    console.log('result[0] : ', result[0])

    const encodedPw = crypto.getPasswordPbkdf2(body.user_pwd, newResult.salt)

    if (newResult.user_pwd === encodedPw){
      console.log('Autehntication succeed')
    } else {
      throw{status : 401, errorMessage : 'Authentication failed'}
    }

    delete newResult.user_pwd
    delete newResult.salt
    res.status(200).json({result:newResult}) //결과를 똑같이 result로 내보내고 싶으면 newResult를 result에 담아줌
  }catch(err){
    console.log('err : ', err)
    next(err)
  }
})

router.get('/', async function(req, res, next) {
  try{
    const user_idx = req.query.user_idx
    const result = await model.getList({user_idx:user_idx}) //result = [{},{},{}]
    if(result.length == 0){
      throw{status: 404, errorMessage: 'User not found'}
    }
    const imgResult = await user_img_model.getList({user_idx:user_idx})
    result[0].images = imgResult

    const diResult = await deliv_info_model.getList({user_idx:user_idx})
    result[0].deliv_info = diResult

    delete result[0].user_pwd
    delete result[0].salt
    res.status(200).json({result:result[0]})
  }catch(err){
    console.log('err : ', err)
    next(err)
  }
});


module.exports = router;
