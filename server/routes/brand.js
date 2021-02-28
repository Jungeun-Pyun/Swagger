var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/brand')

router.post('/', async function(req, res, next) {
    const body = req.body
    console.log('body : ', body)
    try {
        const connection = await db.beginTransaction()
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
    console.log('body : ', body)
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
    console.log('body : ', body)
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(connection, {brand_idx:body.brand_idx})
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('error : ', err)
        next(err)
    }
  });


router.get('/', async function(req, res, next) {
    try{
        const brand_idx = req.query.brand_idx
        const result = await model.getList({brand_idx:brand_idx})
        res.status(200).json({result})
    } catch (err){
        console.log('error : ', err)
        next(err)
    }
});

module.exports = router;