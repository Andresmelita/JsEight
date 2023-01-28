'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('PublicationTags', {
        tag_id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'Tags',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
          onDelete: 'CASCADE' // Elijan como quieren que se comporte la DB
        },
        publication_id: {
          type: Sequelize.UUID,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'publications',
            key: 'id'
          },
          onUpdate: 'CASCADE', // Casi siempre elegimos CASCADE
          onDelete: 'CASCADE' // Elijan como quieren que se comporte la DB
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }

  },
  async down(queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.dropTable('PublicationTags', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}