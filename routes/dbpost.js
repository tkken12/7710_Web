const express = require('express')
const router = express.Router()
const post = require('../model/schema')

/*  ----- set  CRUD ----- */

router.get('/', (req, res) => {
    post.find({})
        .sort('-createAt')
        .exec((req, res) => {
            if (err) return res.json(err)
            res.render('dir 지정해줄것', {
                post: post // ejs에서 지정한 변수로 할것
            })
        })
})

//등록
router.post('/', (req, res) => {
    post.create(req.body, (err, post) => {
        if (err) return res.json(err)
        res.redirect('/지정할것')
    })
})

//로그인 후 유저 시점
router.get('/:id', (req, res) => {
    post.findOne({
        _id: req.param.id
    }, (err, post) => {
        if (err) return res.json(err)
        res.render('디렉토리 지정', {
            post: post
        })
    })
})



module.exports = router