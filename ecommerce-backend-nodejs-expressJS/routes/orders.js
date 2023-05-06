const express = require('express')
const { createOrder, listOrders, getStatus, updateOrderStatus } = require('../controllers/orderController')
const { isAuth, isAdmin, requireSignIn } = require('../middlewares/auth')
const { decreaseQuantity } = require('../middlewares/product')
const { userById, addProductsToUserHistory } = require('../middlewares/user')
const { orderById } = require('../middlewares/order')
const router = express.Router()

router.post('/create/:userId',[requireSignIn,isAuth,addProductsToUserHistory,decreaseQuantity],createOrder)
router.param('userId',userById)
router.get('/:userId',[requireSignIn,isAuth,isAdmin],listOrders)
router.get('/status/:userId',[requireSignIn,isAuth,isAdmin],getStatus)
router.patch('/:orderId/status/:userId',[requireSignIn,isAuth,isAdmin],updateOrderStatus)
router.param('orderId',orderById)


module.exports = router