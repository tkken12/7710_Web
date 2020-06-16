const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const util = require('./util')

// call mongo
const mongoose = require('mongoose')
const mongoUri = 'mongodb://localhost/7710'

// mongo connection & setting --> 몽고디비 버전이 높아서 에러 방지용으로 넣은 것
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

//mongo connection 
let db = mongoose.connection
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to mongoDB')
})
mongoose.connect(mongoUri) // use default mongodb port(27107)

//route path 
const indexRouter = require('./routes/index')
const signUpRouter = require('./routes/signUp')
const myPageRouter = require('./routes/myPage')
const open = require('./routes/open')

// view engine setup
app.set('views', path.join(__dirname, 'views')); // client가 접근할때 가장 먼저보는 프론트 지정
app.set('view engine', 'ejs'); // 뷰엔진을 무엇을 쓰는지 지정

// 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // 로그인했을때 쿠기 남게 해주것
app.use(express.static(path.join(__dirname, 'public'))); // html에 접근할때  스타일 디렉토리 지정



// passport의 세션 초기화를 위한 설정, session의 해쉬화 -> 비밀번호 해쉬화
app.use(session({
  secret: '1q2w3e4r',
  cookie: {
    maxAge: 60 * 60 * 1000 // 남아 있을지 ms 기준
  },
  resave: true,
  saveUninitialized: false
}))
app.use(passport.initialize()) // passport 구동 --> 세션에 로그인 정보 저장
app.use(passport.session())
app.use(flash()) //1회성 메시지를 내보낼때 사용
app.use(logger('dev'));


//Custom Middlewares -> 현재 클라이언트가 로그인 유뮤 상태를 리턴
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() // req.isAuthenticate()는 passport에서 제공하는 함수로, 현재 로그인이 되어있는지 아닌지를 true, false로 리턴, res.locals.isAuthenticated는 ejs에서 user가 로그인 되어있는지 아닌지 확인
  res.locals.currentUser = req.user // req.user는 passport에서 추가하는 항목으로 로그인이 되면 session으로 부터 user를 deserialize하여 생성, res.locals는 req.user와 req.isAuthenticated를 담는데 ejs에서 바로 사용 가능, res.locals.currentUser는 user 정보를 불러오는데 사용
  //res.locals.util = util
  next()
})

//call route
app.use('/', indexRouter) // == app.use('/', require('./routes/index'))
app.use('/signup', signUpRouter)
app.use('/mypage', myPageRouter)
app.use('/open', util.getPostQueryString, open) //id 가지고 넘어감
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;