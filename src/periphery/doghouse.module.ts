import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'
import { DoghouseController } from '~/periphery/presentation/doghouse/doghouse.controller'
import { DoghouseService } from '~/application/doghouse/doghouse.service'

@Module({
  imports: [SequelizeModule.forFeature([Doghouse])],
  controllers: [DoghouseController],
  providers: [DoghouseService]
})
export class DoghouseModule {}
