const express = require("express");
const router = express.Router();
const conn = require('../mariadb'); // db 모듈
const {allCategory} = require('../controller/CategoryController')

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


// 카테고리 전체 목록 조회
router.get('/', allCategory);


module.exports = router;
