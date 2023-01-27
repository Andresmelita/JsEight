const express = require('express')
const router = express.Router()
const passportJWT = require('../libs/passport')
const roleMiddleware= require('../middlewares/role.middleware')

const {
  getUsers,
  getUser,
  updateUser,
  getInfoUser,
  getEmail
} = require('../controllers/users.controller')

const { getVote } = require('../controllers/votes.controller')
const { getPublicationsByUser } = require('../controllers/publications.controller')

//? this route is administrave
router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }),roleMiddleware,getUsers)

router.get('/mail/', getEmail)
router.get('/user-info', passportJWT.authenticate('jwt', { session: false }), getInfoUser)

//? this routes is for users loged
router.route('/:id')
  .get(passportJWT.authenticate('jwt', { session: false }),getUser)
  .put(passportJWT.authenticate('jwt', { session: false }),updateUser)
// router.delete('/:id', removeUser)

router.route('/:id/votes')
  .get(passportJWT.authenticate('jwt', { session: false }),getVote)

router.route('/:id/publications')
  .get(passportJWT.authenticate('jwt', { session: false }),getPublicationsByUser)

module.exports = router