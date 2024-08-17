const express = require('express')
const router = express.Router()

const Controller = require('../controller/calcControll')

router.post('/addCalc', Controller.AddCalc)
router.get('/fetchCalc', Controller.GetTask)
router.delete('/delete', Controller.Delete)

module.exports = router