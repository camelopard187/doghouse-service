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

import { DogService } from '~/application/dog/dog.service'
import { DogCreateDto } from '~/application/dog/dog-create.dto'
import { DogListDto } from '~/application/dog/dog-list.dto'
import { SequelizeConnectionRefusedErrorFilter } from '~/periphery/presentation/common/sequelize-connection-refused-error.filter'
import type { Dog } from '~/periphery/persistence/dog/dog.model'

@ApiTags('dog')
@Controller({ version: '2', path: 'dog' })
@UseFilters(SequelizeConnectionRefusedErrorFilter)
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of dogs'
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
    query: DogListDto
  ): Promise<Dog[]> {
    return this.dogService.findAll(query)
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created'
  })
  @ApiResponse({
    status: 400,
    description: 'The request contains invalid data or a duplicate dog'
  })
  @Post('create')
  async create(@Body(ValidationPipe) createDogDto: DogCreateDto): Promise<Dog> {
    return await this.dogService.create(createDogDto)
  }
}
