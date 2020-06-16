const express = require('express');
const router = express.Router();
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const schema = require('../model/users')
const crypto = require('crypto')
const Post = require('../model/post');
const Join = require('../model/join')


/* GET home page. --> index.ejs를 시각화 */ 
router.get('/', (req, res) => {
  Post.find({}) // 몽고디비에서 현재 저장된 게시글을 모두 내림차순으로 정렬시키고 호출
    .sort("-createdAt") //내림차순으로 정렬
    .exec((err, post) => {//db에있는 게시글을 홈페이지에 넘겨줌
      if (err) {
        console.log(err) // 호출에 실패하면 로그
      } else {
        res.render("index", { // 성공하면 ejs 변수명에 db 정보 보냄
          post: post // ejs에서 사용할 변수
        })
      }
    })
})



// 게시글 클릭시 조인 페이지로 이동
router.get('/join/:id', (req, res) => { // mongodb ID 호출
  console.log('파라미터확인' + req.params._id)
  
  Post.findOne({
    _id: req.params.id
  }, (err, post) => {
    if (err) console.log(req.params.id + 'ID 확인')
    res.render('ggjoin', {
      post: post
    })
  })
})

 //join 할때 몽고디비에 저장시키기 위한 쿼리요청
router.post('/join/:id', (req, res) => {
  let join = new Join()
  //join.quantity = req.body.quantity
  join.joinUsers = req.body.joinUsers
  console.log('조인확인' + join._id)
  console.log('아디확인' + req.params._id)
  Post.findOneAndUpdate({_id: req.body.id  }, { $push: { currentUser: join  }}, (err, post) => {
    if (err) {
      console.log('조인확인' + req.body.joinUser)
    }
    res.redirect('/')
  })
})






module.exports = router;