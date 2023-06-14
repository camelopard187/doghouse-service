// eslint-disable-next-line @typescript-eslint/no-var-requires
const { STRING, INTEGER, DATE, fn } = require('sequelize')

module.exports = {
  up: async query => {
    await query.createTable('Doghouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },

      name: { unique: true, type: STRING },
      color: { type: STRING },
      tail: { type: INTEGER },
      weight: { type: INTEGER },

      createdAt: { defaultValue: fn('NOW'), type: DATE },
      updatedAt: { defaultValue: fn('NOW'), type: DATE }
    })
  },

  down: async query => {
    await query.dropTable('Doghouses')
  }
}
