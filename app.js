// express 모듈
const express = require('express');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);


const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const likeRouter = require('./routes/likes')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/orders')
const categoryRouter = require('./routes/category')

app.use("/users", userRouter)
app.use("/books", bookRouter)
app.use("/category", categoryRouter)
app.use("/likes", likeRouter)
app.use("/cart", cartRouter)
app.use("/orders", orderRouter)


