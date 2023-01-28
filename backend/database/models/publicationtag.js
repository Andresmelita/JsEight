'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicationTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  PublicationTag.init({
    tag_id: {
      type: DataTypes.BIGINT,
      primaryKey:true
    },
    publication_id: {
      type: DataTypes.UUIDV4,
      primaryKey:true
    }
  }, {
    sequelize,
    modelName: 'PublicationTag',
    tableName: 'publications_tags',  // y la tabla en la DB para ser explicitos
    underscored: true,
    timestamps: true,
    // Los scopes son útiles para estandarizar dónde se regresa información  
    // y minimizar que se nos escape algo
    scopes: {
      public_view: {
        attributes: ['tag_id','publication_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  })
  return PublicationTag;
};