const express = require('express')
const router = express.Router()
const {getTags,addTag,updateTag,removeTag} = require('../controllers/tags.controllers')

router.route('/')
  .get(getTags)
  .post(addTag)

router.route('/:tag_id')
  .put(updateTag)
  .delete(removeTag)

  
module.exports = router