const express = require('express')
const router = express.Router()
const Post = require('../model/post')
const util = require('../util')

/*  ----- set  CRUD ----- */
router.get('/', async (req, res) => { // 동기식 처리
    let page = Math.max(1, parseInt(req.query.page)); // 쿼리 스트링으로 받은 page, limit을 req.query를 통해 받아옴
    let limit = Math.max(1, parseInt(req.query.limit)); // Math.max는 page, limit이 양수이어야 하므로 선택, parseInt는 query로 날라오는 문자열이 숫자일수도 있고 아닐수도 있어서 사용
    page = !isNaN(page) ? page : 1; // 만약 query 스트링으로 오는 값이 정수로 변환이 불가능 할 경우 기본값을 이용하기 위해 설정한다.
    limit = !isNaN(limit) ? limit : 2;

    let skip = (page - 1) * limit; // 무시할 게시물수 지정, 페이지당 2개의 게시물이 있고 4번째 페이지를 생성할려고 하면 DB에서 첫 6번 건너뛰고 7번째에 생성
    let count = await Post.countDocuments({}); // promise가 진행완료 전까지 수행x 완료되면 resolve된 값을 return
    let maxPage = Math.ceil(count / limit); // 전체 페이지수 계산
    let posts = await Post.find({}) // 
        .populate('creator')
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)
        .exec();

    res.render('index', {
        posts: posts,
        currentPage: page,
        maxPage: maxPage,
        limit: limit
    })
})

// create
router.post('/', util.isLoggedin, (req, res) => {
    req.body.creator = req.user._i
    Post.create(req.body, function (err, post) {
        if (err) {
            req.flash('post', req.body)
            req.flash('errors', util.parseError(err))
            return res.redirect('/open/new' + res.locals.getPostQueryString());
        }
        res.redirect('/open/new' + res.locals.getPostQueryString(false, {
            page: 1
        }))
    })
})

module.exports = router