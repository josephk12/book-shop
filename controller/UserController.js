const {StatusCodes} = require('http-status-codes'); // 상태 모듈
const conn = require('../mariadb'); // db 모듈
const jwt = require('jsonwebtoken'); // jwt 모듈
const crypto = require('crypto') // 암호화 모듈
const dotenv = require('dotenv'); // env모듈
dotenv.config(); // 사용 선언

const join = (req,res) => {
  const {email, password} = req.body;

  // 비밀번호 암호화
  const salt = crypto.randomBytes(64).toString('base64');
  const hashPassword = crypto.pbkdf25ync(password, salt, 10000, 64, 'sha512').toString('base64')

  

  let sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
  let values = [email, password]

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
      if (loginUser && loginUser.password == password) {

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
  let sql = 'SELECT * FROM users WHERE email = ?'
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

  let sql = 'UPDATE users SET password = ? WHERE email = ?';
  let values = [password, email];
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
