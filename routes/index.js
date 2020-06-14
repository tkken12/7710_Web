const express = require('express');
const router = express.Router();
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const schema = require('../model/users')
const crypto = require('crypto')


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
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

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //request callback 여부
  },
  function (req, username, password, done) {
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
  function (req, res) {
    res.redirect('/');
    //로그인 성공 시 '/'으로 이동
  });

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router;