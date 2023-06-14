import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsPositive, IsNumber, IsNotEmpty } from 'class-validator'

export class DoghouseCreateDto {
  @ApiProperty({
    description: 'The name of the doghouse',
    example: 'Bark Bungalow'
  })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({
    description: 'The color of the doghouse',
    example: 'Green'
  })
  @IsString()
  @IsNotEmpty()
  color!: string

  @ApiProperty({
    description: "The length of the dog's tail",
    example: 3
  })
  @IsNumber()
  @IsPositive()
  tail!: number

  @ApiProperty({
    description: 'The weight of the doghouse',
    example: 10
  })
  @IsNumber()
  @IsPositive()
  weight!: number
}
