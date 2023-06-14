import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseFilters,
  ValidationPipe
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { DoghouseService } from '~/application/doghouse/doghouse.service'
import { DoghouseCreateDto } from '~/application/doghouse/doghouse-create.dto'
import { DoghouseListDto } from '~/application/doghouse/doghouse-list.dto'
import { SequelizeConnectionRefusedErrorFilter } from '~/periphery/presentation/common/sequelize-connection-refused-error.filter'
import type { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'

@ApiTags('doghouse')
@Controller({ version: '1', path: 'doghouse' })
@UseFilters(SequelizeConnectionRefusedErrorFilter)
export class DoghouseController {
  constructor(private readonly doghouseService: DoghouseService) {}

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of doghouses'
  })
  @ApiResponse({
    status: 400,
    description: 'The request contains invalid query parameters'
  })
  @Get('list')
  async list(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    )
    query: DoghouseListDto
  ): Promise<Doghouse[]> {
    return this.doghouseService.findAll(query)
  }

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
