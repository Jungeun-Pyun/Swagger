var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/goods_img')
//원래 formidable해서 파일을 가져오면 임시 경로에 저장을 해둠
// 해당 파일을 특정 경로에 저장해주기 위해선 임시경로의 파일을 복사해서 해당 경로에 붙이고 기존 가상 폴더를 삭제해줘야 함
// renameSync가 그 동작을 해줌

const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const util = require('../components/util')

//기본적으로 http 통신 프로토콜에선 req, res에 텍스트를 전달하면서 통신한다. 
//텍스트외의 파일을 업로드하기 위해서는 form-data 형식으로 통신을 해야하고 form-data 형식을 사용하기 위해선 추가 모듈이 필요하다. => formidable 사용

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
            if(file){
                const file = files.image
                const currentTime = util.getCurrentTime().replace(" ","") //빈칸 없애주기 위함
                const dir = `public/images/goods/${currentTime}` //query: { user_idx: '3' }
                //public을 붙이면 해당 폴더가 외부에서 접근했을 때 보이도록 만들어 주는 것
                //실제 프론트에서 접근하는 경로에는 쓰일 필요 없음
                !fs.existsSync(dir) && fs.mkdirSync(dir) // 짧은조건문 || : 조건문이 거짓일 때 실행, && : 조건문이 참일 때 실행
                const newPath = path.join(__dirname,'..', `${dir}/${file.name}`) //__dirname : 현재경로 가져오기
                fs.renameSync(file.path, newPath)
                res.json({result: `images/goods/${currentTime}/${file.name}`})
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
        next(err)
    }
})

// router.post('/multi', async function(req, res, next) {
//     try {
//         const body = req.body
//         console.log('body : ', body)
//         console.log('body.list[0] : ', body.list[0])
//         const connection = await db.beginTransaction()

//         // const img_path = body.img_path
//         if(body.list && body.list.length > 0) { 
//             let imagesArray = []
//             for(let i=0;i<body.list.length;i++){
//                 const {goods_idx, img_path} = body.list[i]
//                 console.log('goods_idx : ', goods_idx)
//                 console.log('img_path : ', img_path)

//                 imagesArray.push(
//                     goods_idx,
//                     img_path
//                 )
//                 console.log('imagesArray : ', imagesArray)

//                 const result = await model.multipleInsert(connection, imagesArray)
//             }
//         }
//         // const result = await model.multipleInsert(connection, imagesArray)
//         await db.commit(connection)
//         res.status(200).json({result})
//     } catch (err){
//         next(err)
//     }
// })


  router.put('/', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const result = await model.update(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
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