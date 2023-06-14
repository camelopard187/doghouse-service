import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsPositive } from 'class-validator'

import { IsModelKey } from '~/common/is-model-key.decorator'
import { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'
import type { DoghouseAttributes } from '~/periphery/persistence/doghouse/doghouse.model'

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export class DoghouseListDto {
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
    description: 'The maximum number of doghouses to return per page',
    example: 5,
    default: 5
  })
  limit: number = 5

  @IsModelKey(Doghouse)
  @ApiProperty({
    description: 'The attribute to use for sorting the doghouses',
    type: 'string',
    example: 'id',
    default: 'id'
  })
  attribute: keyof DoghouseAttributes = 'id'

  @IsEnum(Order)
  @ApiProperty({
    description: 'The order in which the doghouses should be sorted',
    enum: Order,
    example: Order.Asc,
    default: Order.Asc
  })
  order: Order = Order.Asc
}
