const mongoose = require('mongoose')

let Schema = mongoose.Schema

// 조인 유저를 위한 스키마
let joinSchema = new Schema({
    joinUsers: String
    //quantity: Number
})

// 게시글 스키마
let postSchema = new Schema({
    creator: { //개설자 구분을 위한 스키마
        type: String
    },
    product:{
        type:String
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
        type: String
    },
    currentUser : [joinSchema]

});

module.exports = mongoose.model('post', postSchema)