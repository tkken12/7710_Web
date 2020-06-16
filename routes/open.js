const express = require('express')
const router = express.Router()
const Post = require('../model/post')
const util = require('../util')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

router.get('/', (req, res) => { // 동기식 처리
    res.render('ggopen')
})

//해당 미들웨어는 몽고디비에 정보를 저장하기 위해서만 존재
// create
router.post('/create', (req, res) => {
    let post = new Post()
    post.creator = req.body.creator // 스키마앞에 인스턴스 이름 안넣어주면 인서트 못함 이걸로 1시간 삽질
    post.product = req.body.product
    post.information = req.body.information
    post.duration = req.body.duration
    post.link = req.body.link
    post.kakaoid = req.body.kakaoid
    post.maxParticipants = req.body.maxParticipants
    
    post.save((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        //console.log(JSON.stringify(req.body))
        
    })
})


module.exports = router