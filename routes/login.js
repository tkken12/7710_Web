const express = require('express');
const router = express.Router();
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const schema = require('../model/users')
const crypto = require('crypto')

//로그인화면에서 로그인을 할때 쿠키에 어떻게 저장되는지 
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

// 현재 클라이언트가 로그인이 안되어있으면 강제로 로그인화면으로 이동
router.post('/', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), // 인증 실패 시 '/login'으로 이동
    (req, res) => {
        res.redirect('/');
        //로그인 성공 시 '/'으로 이동
    });



/* GET login page -> 라우팅 받은 경로가 기준이 됨, 즉 app.js에서 라우팅을 '/'으로 받아서 localhost:port/login이 됨 */
router.get('/', (req, res, next) => {
    res.render('login')
})

//세션에 로그인 정보 저장
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = router