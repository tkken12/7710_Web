const mongoose = require('mongoose')

let postSchema = mongoose.Schema({

    creator: { //개설자 구분을 위한 스키마
        type: String,
        required: {
            type: mongoose.Schema.Types.ObjectId, //users.id와 post의 creator와 연결
            ref: 'users',
            required: true
    },
    information: {
        type: String,
        required: [true, '제품 설명을 작성해주세요']
    },
    duration: {
        type: String,
        required: [true, '참여 기간을 작성해주세요.'],
        match: [/^[0-9]+$/, '숫자만 입력 해주세요.']
    },
    link: {
        type: String,
        required: [true, 'kakao Open 채팅 링크를 작성하여 주십시오.']
    },
    kakaoid: {
        type: String,
       
        }
    },
    /*maxParticipants: { // 최대 참여인원수 지정
        type: Number,
        required: [true, '최대 참여자를 선택해주세요.'],
        //match: [/^.{1}[1-5]+$/, '최대 5명까지 참여가능합니다.']
    },*/
    currentUser: {
        type: [String] // username 저장 최대 5개

    },

    createdAt: {
        type: Date,
        default: Date.now
    }


});

let Post = mongoose.model('post', postSchema);
module.exports = Post;