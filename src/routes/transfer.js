const router = require('express').Router()
const transferController = require('../controllers/transfer')
const { authentication, authorization } = require('../middlewares/auth')

router
    .get('/', authentication, authorization, transferController.getTransfer)
    .get('/history/:id', authentication, authorization, transferController.getHistoryUser)
    .post('/:id', authentication, authorization, transferController.postTransfer)
    .patch('/:id', authentication, authorization, transferController.editTransfer)
    .delete('/:id', authentication, authorization, transferController.deleteTransfer)

module.exports = router