const express = require('express');
const router = express.Router();

const {logIn,verifyUser } = require('../controllers/auth.controller')

const {registerUser } = require('../controllers/users.controller')

router.post('/login', logIn)
router.post('/sign-up', registerUser)

// router.post('/recovery-password', authServices.postRecoveryToken)
// router.patch('/recovery-password/:id', authServices.patchPassword)
router.get('/verify-user/:id', verifyUser)

module.exports = router
