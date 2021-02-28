var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/user_img')

const path = require('path')
const fs = require('fs')
const util = require('../components/util')
const formidable = require('formidable')

router.post('/upload', async function(req, res, next) {
    try{
        const query = req.query
        const form = formidable({multiples: true}) //한번에 여러개 파일 입력받아오는 것 허용
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err)
                return
            }
            // console.log('req : ', req)
            console.log('files : ', files)
            const file = files.image
            if(file){
                const currentTime = util.getCurrentTime().replace(" ","")
                const dir = `public/images/users/${currentTime}` //query: { user_idx: '3' }
                !fs.existsSync(dir) && fs.mkdirSync(dir) // 짧은조건문 || : 조건문이 거짓일 때 실행, && : 조건문이 참일 때 실행
                const newPath = path.join(__dirname,'..', `${dir}/${file.name}`) //__dirname : 현재경로 가져오기
                //__dirname :  /Users/JungeunPyun/Documents/Back-End/6th week/img_upload_practice_Jenna_edit/routes
                //newPath :  /Users/JungeunPyun/Documents/Back-End/6th week/img_upload_practice_Jenna_edit/public/images/2/스크린샷 2021-01-31 오후 6.25.57.png
                fs.renameSync(file.path, newPath)
                res.json({result: `images/users/${currentTime}/${file.name}`})
            } else {
                res.json({result: `no image`})
            }
        })
    }catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.post('/', async function(req, res, next) {
    const body = req.body
    console.log('body : ', body)
    try {
        const connection = await db.beginTransaction()
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
    // console.log('body : ', body)
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        next(err) 
    }
  });

router.get('/', async function(req, res, next) {
    const body = req.body
    const connection = await db.getConnection()
    const result = await model.getList(connection, body) 
    res.status(200).json({result})
});

module.exports = router;