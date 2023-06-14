import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory
} from '@nestjs/throttler'

import type { Environment } from '~/common/environment'

@Injectable()
export class ThrottlerOptions implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService<Environment>) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.configService.get<number>('THROTTLE_TTL'),
      limit: this.configService.get<number>('THROTTLE_LIMIT')
    }
  }
}
