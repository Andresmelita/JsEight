const TagsService = require('../services/tags.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')
const tagsService = new TagsService()

const getTags = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let tags = await tagsService.findAndCount(query)
    const results = getPagingData(tags, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addTag = async (request, response, next) => {
  try {
    let { body } = request
    let tag = await tagsService.createTag(body)
    return response.status(201).json({ results: tag })
  } catch (error) {
    next(error)
  }
}

const updateTag = async (request, response, next) => {
  try {
    let { tag_id } = request.params
    let { body } = request
    let tag = await tagsService.updateTag(tag_id, body)
    return response.json({ results: tag })
  } catch (error) {
    next(error)
  }
}

const removeTag = async (request, response, next) => {
  try {
    let { tag_id } = request.params
    let tag = await tagsService.removeTag(tag_id)
    return response.json({ results: tag, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTags,
  addTag,
  updateTag,
  removeTag
}