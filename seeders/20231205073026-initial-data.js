'use strict';
const restaurantJson = require('../public/jsons/restaurant.json')
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()
      const restaurants = restaurantJson.results.map((restaurant)=>({
        name: restaurant.name,
        name_en: restaurant.name_en,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description,
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash('password',salt)
      await queryInterface.bulkInsert('Users',[
        {
        id:1,
        name:'user1',
        email:'user1@example.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{transaction})

      await queryInterface.bulkInsert('Restaurants',restaurants, {transaction})
      await transaction.commit()
    } catch (error) {
      if(transaction) await transaction.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
