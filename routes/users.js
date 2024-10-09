const express = require("express"); // express 모듈
const router = express.Router(); 
const conn = require('../mariadb'); // db 모듈
const {
  join, 
  login, 
  passwordResetRequest, 
  passwordReset
} = require('../controller/UserController'); // 컨트롤러 불러옴

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


router.post('/join', join) // 회원가입
router.post('/login', login) // 로그인
router.post('/reset', passwordResetRequest); // 비밀번호 초기화 요청
router.put('/reset', passwordReset); // 비밀번호 초기화



module.exports = router;