import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { DoghouseModule } from '~/periphery/doghouse.module'
import { PingController } from '~/periphery/presentation/ping/ping.controller'
import { TimeoutInterceptor } from '~/periphery/presentation/common/timeout.interceptor'
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
    }),
    DoghouseModule
  ],
  controllers: [PingController],
  providers: [{ provide: 'APP_INTERCEPTOR', useClass: TimeoutInterceptor }]
})
export class AppModule {}
