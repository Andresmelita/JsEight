'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.addColumn('publications', 'publication_tag_id', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t })

      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        
        queryInterface.removeColumn('publications', 'publication_tag_id', { transaction: t })

      ]);
    });
  }
};