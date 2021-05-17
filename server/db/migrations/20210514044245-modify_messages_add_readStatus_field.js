'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'messages', // table name
        'readStatus', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('messages', 'readStatus')]);
  }
};
