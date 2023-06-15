import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsPositive } from 'class-validator'

import { IsModelKey } from '~/common/is-model-key.decorator'
import { Dog } from '~/periphery/persistence/dog/dog.model'
import type { DogAttributes } from '~/periphery/persistence/dog/dog.model'

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export class DogListDto {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'The page number for pagination',
    example: 1,
    default: 1
  })
  page: number = 1

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'The maximum number of dogs to return per page',
    example: 5,
    default: 5
  })
  limit: number = 5

  @IsModelKey(Dog)
  @ApiProperty({
    description: 'The attribute to use for sorting the dogs',
    type: 'string',
    example: 'id',
    default: 'id'
  })
  attribute: keyof DogAttributes = 'id'

  @IsEnum(Order)
  @ApiProperty({
    description: 'The order in which the dogs should be sorted',
    enum: Order,
    example: Order.Asc,
    default: Order.Asc
  })
  order: Order = Order.Asc
}
