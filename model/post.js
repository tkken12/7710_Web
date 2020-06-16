const mongoose = require('mongoose')

let Schema = mongoose.Schema

// 조인 유저를 위한 스키마
let joinSchema = new Schema({
    joinUser: String,
    quantity: Number
})

// 게시글 스키마
let postSchema = new Schema({
    creator: { //개설자 구분을 위한 스키마
        type: String
    },
    information: {
        type: String
    },
    duration: {
        type: Number
    },
    link: { 
        type: String 
    },
    kakaoid: {
        type: String 
    },
    maxParticipants: { 
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    joinUsers: [joinSchema]

});

module.exports = mongoose.model('post', postSchema)