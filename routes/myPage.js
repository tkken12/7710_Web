const express = require('express');
const router = express.Router();
const app = express()


router.get('/', (req, res, next) => {
        res.render('mypage')
})

module.exports = router