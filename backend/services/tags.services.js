const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')


class TagsService {

  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }
    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const tags = await models.Tag.findAndCountAll(options)
    return tags
  }

  async createTag(obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let newTag = await models.Tag.create({
        name: obj.name
      }, { transaction })

      await transaction.commit()
      return newTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async updateTag(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tag.findByPk(id)
      if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')

      let updatedTag = await tag.update(obj, {
        where: {
          id: id
        }
      }, { transaction })

      await transaction.commit()

      return updatedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTag(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tag.findByPk(id)

      if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')

      await tag.destroy({ transaction })
      await transaction.commit()
      return tag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports=TagsService