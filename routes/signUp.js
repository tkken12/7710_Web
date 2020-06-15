const express = require('express');
const router = express.Router();
const schema = require('../model/users')
const crypto = require('crypto')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
  res.render('signUp')
})

router.post("/", (req, res, next) => {

  schema.find({
          username: req.body.username
      })
      .exec()
      .then(user => {
        // DB에 같은 아이디가 존재할 경우 
          if (user.length >= 1) {
              res.send('<script type="text/javascript">alert("이미 존재하는 ID 입니다.."); window.location="/signUp"; </script>');
          
          //스키마에 맞춰서 DB에 등록
          } else {
              const user = new schema({
                  _id: new mongoose.Types.ObjectId(),
                  username: req.body.username,
                  password: crypto.createHash('sha512').update(req.body.password).digest('base64'),
                  kakaoid: req.body.kakaoid
                  
              })
              user
                  .save()
                  .then(result => {
                      res.redirect("/");
                  })
                  .catch(err => {
                      console.log(err);
                  })
          }
      })
});



module.exports = router;