const express = require("express");
const router = express.Router();
const conn = require('../mariadb'); // db 모듈
const {
  allBooks,
  bookDetail,
} = require('../controller/BookController'); // 컨트롤러 불러옴

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


// (카테고리별) 도서 전체 조회
router.get('/', allBooks);

// 도서 개별 조회
router.get('/:id', bookDetail);


module.exports = router;
