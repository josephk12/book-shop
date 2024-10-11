const {StatusCodes} = require('http-status-codes'); // 상태 모듈
const conn = require('../mariadb'); // db 모듈
const jwt = require('jsonwebtoken'); // jwt 모듈
const crypto = require('crypto') // 암호화 모듈
const dotenv = require('dotenv'); // env모듈
dotenv.config(); // 사용 선언

const join = (req,res) => {
  const {email, password} = req.body;
  


  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';

  // 암호화된 비밀번호와 slat값을 DB에 함께 저장함
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')
  
  let values = [email, hashPassword, salt]; // 이메일과 해시패스워드, salt로 insert 해줌

  conn.query(sql, values,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end // BAD REQUEST
      }
      return res.status(StatusCodes.CREATED).json(results)
    })
};


// 로그인
const login = (req,res) => {

  const {email, password} = req.body;
  let sql = 'SELECT * FROM users WHERE email = ?'
  conn.query(sql, email,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
      }

      const loginUser = results[0];

      // DB에서 slat값 꺼내서 날 것으로 들어온 비밀번호를 암호화 해보고
      const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64')

      if (loginUser && loginUser.password == hashPassword) { // DB에 저장된 비밀번호랑 비교한다.

        // 토큰 발행
        const token = jwt.sign({
          email : loginUser.email
        }, process.env.PRIVATE_KEY, {
          expiresIn : '5m',
          issuer : 'kim'
        });

        //토큰 쿠키에 담기 = jwt 토큰을 바디로 보내지 않고 쿠키로 보냄
        res.cookie("token", token, {
          httpOnly : true
        });
        console.log(token);

        return res.status(StatusCodes.OK).json(results)
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end(); // 401 : Unauthorized(미인증 상태), 403 : Forbidden(접근권한 없음)
      }
    });  
};


// 비밀번호 초기화 요청
const passwordResetRequest = (req,res) => {
  const {email} = req.body;
  let sql = 'SELECT * FROM users WHERE email = ?';
  conn.query(sql, email,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
      }

      // 이메일로 유저가 있는지 찾아보자
      const user = results[0];
      if(user) {
        return res.status(StatusCodes.OK).json({
          email : email
        });
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
    }
  )
};



// 비밀번호 초기화
const passwordReset = (req,res) => {
  const {email, password} = req.body;

  let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';

  // 암호화된 비밀번호와 slat값을 DB에 함께 저장함
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')


  let values = [hashPassword, salt, email];

  conn.query(sql, values,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
      }
      if(results.affectedRows == 0)
        return res.status(StatusCodes.BAD_REQUEST).end();
      else
        return res.status(StatusCodes.OK).json(results);
    }
  )
};


module.exports = {
  join, 
  login, 
  passwordResetRequest, 
  passwordReset
};
