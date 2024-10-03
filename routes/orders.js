const express = require("express");
const router = express.Router();

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


// 주문하기
router.post('/', (req,res) => {
  res.json('주문하기');
});


// 주문 목록 조회
router.get('/', (req,res) => {
  res.json('주문 목록 조회');
});


// 주문 상세 상품 조회
router.get('/:id', (req,res) => {
  res.json('주문 상세 상품 조회');
});



module.exports = router;