'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications', {
        //elegir si usan UUID o Serial
        id: { // usando UUID
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        profile_id:{
          allowNull: false,
          type: Sequelize.UUID,
          foreignKey: true,
          references: {
            model: 'Profiles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        publication_type_id:{
          allowNull: false,
          type: Sequelize.BIGINT,
          foreignKey: true,
          references: {
            model: 'Publications_types',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        title:{
          allowNull:false,
          type: Sequelize.STRING,
        },
        description:{
          allowNull: false,
          type: Sequelize.TEXT
        },
        content: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        picture: {
          allowNull: false,
          type: Sequelize.STRING
        },
        city_id: {
          allowNull: false,
          type: Sequelize.STRING,
          foreignKey: true,
          references: {
            model: 'City',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        image_url: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            isUrl: true
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at' // --> Asegurense de establecer el campo en snake_case aquí
          // o usando created_at en vez de createdAt en el Key
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publications',{ transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}