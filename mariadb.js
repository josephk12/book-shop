// mysql 모듈 소환
const mariadb = require('mysql2');

//db와 연결통로 생성
const connection = mariadb.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1234',
  database : 'Bookshop', // 스키마
  dateString : true
});

module.exports = connection;
