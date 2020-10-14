const router = require('express').Router()
const userController = require('../controllers/user')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../middlewares/multer')

router
    .get('/search', authentication, userController.searchAll)
    .get('/search/receiver/:id', authentication, userController.searchOneById)
    .get('/search/:id', authentication, authorization, userController.searchByName)
    .get('/', authentication, authorization, userController.getAllUser)
    .patch('/:id', upload, authentication, authorization, userController.editUser)
    
module.exports = router