import path from 'node:path'
import Umzug from 'umzug'
import type { Sequelize } from 'sequelize-typescript'

export const umzug = (sequelize: Sequelize): Umzug.Umzug =>
  new Umzug({
    migrations: {
      path: path.join(__dirname, '../../', 'sequelize/migration'),
      pattern: /^\d+[\w-]+\.cjs$/,

      params: [sequelize.getQueryInterface()]
    },
    storage: 'sequelize',
    storageOptions: { sequelize }
  })
