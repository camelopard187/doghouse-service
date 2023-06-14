import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type {
  SequelizeModuleOptions,
  SequelizeOptionsFactory
} from '@nestjs/sequelize'

import { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'
import type { Environment } from '~/common/environment'

@Injectable()
export class SequelizeOptions implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService<Environment>) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      uri: this.configService.get<string>('DATABASE_URL'),
      models: [Doghouse]
    }
  }
}
