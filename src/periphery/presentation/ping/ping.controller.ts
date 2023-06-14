import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { name, version } from '~/../package.json'

@ApiTags('ping')
@Controller({ version: '1', path: 'ping' })
export class PingController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successful response with a ping message'
  })
  ping() {
    return { message: `${name} v${version}` }
  }
}
