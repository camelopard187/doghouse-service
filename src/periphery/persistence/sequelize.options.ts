import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type {
  SequelizeModuleOptions,
  SequelizeOptionsFactory
} from '@nestjs/sequelize'

import { Dog } from '~/periphery/persistence/dog/dog.model'
import type { Environment } from '~/common/environment'

@Injectable()
export class SequelizeOptions implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService<Environment>) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      uri: this.configService.get<string>('DATABASE_URL'),
      autoLoadModels: true,
      models: [Dog]
    }
  }
}
