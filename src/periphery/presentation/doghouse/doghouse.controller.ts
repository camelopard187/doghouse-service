import {
  Body,
  Controller,
  Post,
  UseFilters,
  ValidationPipe
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { DoghouseService } from '~/application/doghouse/doghouse.service'
import { DoghouseCreateDto } from '~/application/doghouse/doghouse-create.dto'
import { SequelizeConnectionRefusedErrorFilter } from '~/periphery/presentation/common/sequelize-connection-refused-error.filter'
import type { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'

@ApiTags('doghouse')
@Controller({ version: '1', path: 'doghouse' })
@UseFilters(SequelizeConnectionRefusedErrorFilter)
export class DoghouseController {
  constructor(private readonly doghouseService: DoghouseService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created'
  })
  @ApiResponse({
    status: 400,
    description: 'The request contains invalid data or a duplicate doghouse'
  })
  @Post('create')
  async create(
    @Body(ValidationPipe) createDoghouseDto: DoghouseCreateDto
  ): Promise<Doghouse> {
    return await this.doghouseService.create(createDoghouseDto)
  }
}
