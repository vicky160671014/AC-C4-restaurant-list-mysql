'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull:false
      },
      name_en: {
        type: Sequelize.STRING(50)
      },
      category: {
        type: Sequelize.STRING(20)
      },
      image: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING(50)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      google_map: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Restaurants');
  }
};