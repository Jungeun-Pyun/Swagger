var express = require('express');
var router = express.Router();
const db = require('../components/db')
const model = require('../models/review')

router.post('/', async function(req, res, next) {
    const body = req.body
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
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(connection, {review_idx:body.review_idx})
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err) 
    }
});

router.get('/', async function(req, res, next) {
    try{
        const result = await model.getList(req.query)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err) 
    }
});

module.exports = router;