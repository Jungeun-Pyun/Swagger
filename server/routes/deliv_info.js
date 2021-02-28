var express = require('express');
var router = express.Router();
const db = require('../components/db')
const model = require('../models/deliv_info')

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

router.put('/multi', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const result = await model.multipleUpdate(connection, body)
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

  router.delete('/multi', async function(req, res, next) {
    const body = req.body
    try {
        const connection = await db.beginTransaction()
        const result = await model.multipleDelete(connection, body)
        await db.commit(connection)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
  });

router.get('/', async function(req, res, next) {
    const body = req.body
    try {
        const result = await model.getList(body)
        res.status(200).json({result})
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
});

module.exports = router;