const express = require('express');
const router = express.Router();
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const schema = require('../model/users')
const crypto = require('crypto')
const Post = require('../model/post');

/* GET home page. */
router.get('/', (req, res) => {
  Post.find({})
    .sort("-createdAt") //내림차순으로 정렬
    .exec((err, post) => {
      if (err) {
        console.log(err) // 호출에 실패하면 로그
      } else {
        res.render("index", { // 성공하면 ejs 변수명에 db 정보 보냄
          post:post
        })
      }
    })
})
// 게시글 클릭시 조인 페이지로 이동
router.get('/join/:id', (req, res) => {
  console.log(req.params._id)
  Post.findOne({_id: req.params.id}, (err, post) => {
    if(err) console.log(req.params.id + 'ID 확인')
    res.render('ggjoin', {post:post})
  })
})

/* GET login page -> 라우팅 받은 경로가 기준이 됨, 즉 app.js에서 라우팅을 '/'으로 받아서 localhost:port/login이 됨 */
router.get('/login', (req, res, next) => {
  res.render('login')
})

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user);
});

//로그인 정보를 클라이언트 사이드가 가지게 됨
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //request callback 여부
  },
  (req, username, password, done) => {
    schema.findOne({
      username: username,
      password: crypto.createHash('sha512').update(password).digest('base64')
    }, function (err, user) {
      if (err) {
        throw err
      } else if (!user) {
        return done(null, false, req.flash('login_message', 'ID 또는 비밀번호를 확인하세요.')) // 로그인 실패
      } else {
        return done(null, user) // 로그인 성공
      }
    });
  }
));

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), // 인증 실패 시 '/login'으로 이동
  (req, res) => {
    res.redirect('/');
    //로그인 성공 시 '/'으로 이동
  });

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router;