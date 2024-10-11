const {StatusCodes} = require('http-status-codes'); // 상태 모듈
const conn = require('../mariadb'); // db 모듈


// 도서 전체 & 카테고리 조회
const allBooks = (req,res) => {
  let {category_id} = req.query; 

  if(category_id) { // 카테고리 조회
    let sql = "SELECT * FROM books WHERE category_id=?";
    conn.query(sql, category_id,
      (err, results) => {
        if(err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
        }
        if(results.length)
          return res.status(StatusCodes.OK).json(results[0]); // results[0]을 보내면 배열형태가 아니게 됨
        else
          return res.status(StatusCodes.NOT_FOUND).end();
      })
  } else { // 도서 전체조회
  let sql = "SELECT * FROM books";
  conn.query(sql, (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
      }
      return res.status(StatusCodes.OK).json(results);
    })
  }
};


// 도서 개별 조회
const bookDetail = (req,res) => {
  let {id} = req.params; // url을 가져올 때 prams가 json형태이기 때문에 비구조화가 될 수 있는 것

  let sql = "SELECT * FROM books WHERE id=?";
  conn.query(sql, id,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
      }
      if(results[0])
        return res.status(StatusCodes.OK).json(results[0]); // results[0]을 보내면 배열형태가 아니게 됨
      else
        return res.status(StatusCodes.NOT_FOUND).end();
    });
};





module.exports = {
  allBooks,
  bookDetail,
};
