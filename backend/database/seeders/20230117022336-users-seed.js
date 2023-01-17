//Seeder creado

//noten que es igual a una migración!

'use strict';
const { Op } = require("sequelize");
const {v4: uuid4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('users', [
        {
          id: '',
          first_name:'',
          last_name:'',
          email:'',
          username:'',
          password:'',
          created_at: new Date(),
          updated_at: new Date()
        },
    ], { transaction })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('users', {
        email: {
          [Op.or]: []
        } 
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }
};