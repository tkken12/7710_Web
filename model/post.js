const mongoose = require('mongoose')

let Schema = mongoose.Schema

let joinSchema = new Schema({
    joinUser: String,
    quantity: Number
})

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
    link: { // 기입안됨
        type: String 
    },
    kakaoid: { //기입안됨
        type: String 
    },
    maxParticipants: { // 최대 참여인원수 지정 기입안됨
        type: Number
    },
    currentUser: {
        type: [mongoose.Schema.Types.ObjectId, String] // username 저장 최대 5개
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    joinUsers: [joinSchema]

});

module.exports = mongoose.model('post', postSchema)