const express = require("express");
const router = express.Router();

router.use(express.json()); // POST를 사용하면 값을 json형태로 받아오기 때문에 추가


// 좋아요 추가
router.post('/:id', (req,res) => {
  res.json('좋아요 추가');
});


// 좋아요 삭제
router.delete('/:id', (req,res) => {
  res.json('좋아요 삭제');
});






module.exports = router;