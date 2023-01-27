'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications_tags.hasMany(models.Publications, { as: 'publications', foreignKey: 'publication_tag_id' })
    }
  }
  publications_tags.init({
    tag_id: DataTypes.INTEGER,
    publication_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'publications_tags',
  });
  return publications_tags;
};