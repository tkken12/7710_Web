const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, '아이디를 입력해 주십시오'], // 필수항목 필요시
        unique: true, //db 등록때 중복 X
        match: [/^.{4,12}$/, '4~12사이로 작성해주세요.'], // 정규표현식으로 제한가능, 정규표현식은 / / 안에서 작성해서 판단 ^는 문자열의 시작 위치, .은 어느 문자열이나 상관없음., {n,m}은 n이상 m이하, $문자열 끝 위치
        trim: true // 공백제거
    },
    password: {
        type: String,
        required: [true, '패스워드를 입력해 주십시오'],
        select: false, // DB에서 해당 모델을 읽어올때 항목값을 읽지않음
        trim: true
    },
    kakaoid: {
        type: String,
        required: [true, '카카오 아이디를 입력해 주십시오'],
        unique: true,
        trim: true
    }
}, {
    toObject: {
        virtuals: true
    }
})

//virtual은 db에서 저장할 필요는 없을때 사용, 보통 passwd와 비교할때 씀
userSchema.virtual('passwordConfirmation')
    .get(function () {
        return this._passwordConfirmation;
    })
    .set(function (value) {
        this._passwordConfirmation = value;
    });

userSchema.virtual('originalPassword')
    .get(function () {
        return this._originalPassword;
    })
    .set(function (value) {
        this._originalPassword = value;
    });

/*userSchema.virtual('currentPassword')
    .get(function () {
        return this._currentPassword;
    })
    .set(function (value) {
        this._currentPassword = value;
    });

userSchema.virtual('newPassword')
    .get(function () {
        return this._newPassword;
    })
    .set(function (value) {
        this._newPassword = value;
    });
*/
/*
// password validation
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
let passwordRegexErrorMessage = '비밀번호는 8~16자리 사이로 작성 하셔야합니다.';

// db에 패스워드 생성 전 값(valid)이 유효한지(validate) 확인
userSchema.path('password').validate((v) => {
    let user = this; // this는 user model임

    // create user
    if (user.isNew) { // 해당 모델이 생성되는 경우 true, 아닐경우 false의 값을 가진다. 회원가입인지, 아닌지 판단
        if (!user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
        }

        if (!passwordRegex.test(user.password)) {
            user.invalidate('password', passwordRegexErrorMessage);
        } else if (user.password !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }
})*/
/*
// hash password
userSchema.pre('save', (next) => {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password);
        return next();
    }
});

// model methods
userSchema.methods.authenticate = (password) => {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};
*/

module.exports =  mongoose.model('user', userSchema)
