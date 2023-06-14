import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { SequelizeOptions } from '~/periphery/persistence/sequelize.options'
import { validate } from '~/common/environment'

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validate
    }),
    SequelizeModule.forRootAsync({
      useClass: SequelizeOptions,
      imports: [ConfigModule]
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
