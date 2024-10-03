const express = require("express");
const router = express.Router();

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


// 장바구니 담기
router.post('/', (req,res) => {
  res.json('장바구니 담기');
});


// 장바구니 조회
router.get('/', (req,res) => {
  res.json('장바구니 조회');
});


// 장바구니 제거
router.delete('/:id', (req,res) => {
  res.json('장바구니 제거');
});


// 장바구니에서 선택한 목록 조회
// router.get('/', (req,res) => {
//   res.json('장바구니에서 선택한 목록 조회');
// });



module.exports = router;