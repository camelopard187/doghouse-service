import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Dog } from '~/periphery/persistence/dog/dog.model'
import { DogController } from '~/periphery/presentation/dog/dog.controller'
import { DogService } from '~/application/dog/dog.service'

@Module({
  imports: [SequelizeModule.forFeature([Dog])],
  controllers: [DogController],
  providers: [DogService]
})
export class DogModule {}
