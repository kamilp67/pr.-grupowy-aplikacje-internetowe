const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, getBookImg } = require('./bookController')
const { getAllOrders, createOrder, getOrderItems } = require('./orderController')
const { createUser, getUserById, } = require('./userController')
// const { signup, signin, authConfirm, logout, getUser } = require('./controllers/authController');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');


router.route('/books')
  .get(getAllBooks)

router.route('/books/:id')
  .get(getBookById)

router.route('/imgs/:id')
  .get(getBookImg)


router.route('/orders')
  .post(createOrder)
  .get(getAllOrders)

router.route('/orderItems/:id')
  .get(getOrderItems)

router.route('/users')
  .post(createUser)

// router.route('/users/:id')
//   .get(getUserById)

// router.route('/signup')
//   .post(signup)

// router.route('/signin')
//   .post(signin)

// router.route('/logout')
//   .get(logout)

// router.route('/authConfirm')
//   .get(requireAuth, authConfirm)

// router.route('/user')
//   .get(getUser)



module.exports = router