'use strict';
const bcrypt = require('bcryptjs')
const initialRestaurantData = require('../public/jsons/restaurant.json').results
initialRestaurantData.forEach((data)=>{
  if(data.id <= 4) {data.userId = 1}
  else {data.userId =2}
  data.createdAt = new Date()
  data.updatedAt = new Date()
  })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()

      const initialUsers = await Promise.all(Array.from({ length:2 }, async(_,i)=>{
        const hash = await bcrypt.hash('12345678',10)

        return {
          id: i+1,
          name: `user${ i+1 }`,
          email: `user${ i+1 }@example.com`,
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }))

      await queryInterface.bulkInsert('Users',initialUsers,{ transaction })
      await queryInterface.bulkInsert('Restaurants',initialRestaurantData,{ transaction })

      await transaction.commit()

    } catch (error) {
      if(transaction) await transaction.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
