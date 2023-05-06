const express = require('express')
const { createCategory, showCategory, categoryId, allCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { isAuth, isAdmin, requireSignIn } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')
const router = express.Router()

router.post('/create/:userId',[requireSignIn,isAuth,isAdmin], createCategory)
router.param('userId',userById)
router.get('/',allCategories)
router.put('/:categoryId/:userId',[requireSignIn,isAuth,isAdmin], updateCategory)
router.delete('/:categoryId/:userId',[requireSignIn,isAuth,isAdmin], deleteCategory)

router.get('/:categoryId', showCategory)
router.param('categoryId',categoryId)







module.exports = router