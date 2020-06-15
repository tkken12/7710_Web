const express = require('express')
const router = express.Router()
const Post = require('../model/post')
const util = require('../util')
const mongoose = require('mongoose')

router.get('/', (req, res) => { // 동기식 처리
    res.render('ggopen')
})

// create
router.post('/create', (req, res) => {
    let post = new Post()
    post.creator = req.body.creator // 스키마앞에 생성자 이름 안넣어주면 인서트 못함 이걸로 1시간 삽질
    post.information = req.body.information
    post.duration = req.body.duration
    post.link = req.body.link
    post.kakaoid = req.body.kakaoid
    post.maxParticipants = req.body.maxParticipants
    currentUser = {
        type: [post.creator, String]
    }

    post.save((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log(JSON.stringify(req.body))
        
    })
})


module.exports = router