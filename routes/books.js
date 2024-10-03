const express = require("express");
const router = express.Router();

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


// 도서 전체 조회
router.get('/', (req,res) => {
  res.json('도서 전체 조회');
});



// 도서 개별 조회
router.get('/:id', (req,res) => {
  res.json('도서 개별 조회');
});



// 카테고리별 도서 목록 조회
router.get('/', (req,res) => {
  req.query.categoryId // 쿼리 스트링은 url이 아니라 이렇게 해주어야 함

  res.json('카테고리별 도서 목록 조회');
});





module.exports = router;