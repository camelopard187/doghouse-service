import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsPositive, IsNumber, IsNotEmpty } from 'class-validator'

export class DogCreateDto {
  @ApiProperty({
    description: 'The name of the dog',
    example: 'Oliver'
  })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({
    description: 'The color of the dog',
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
    description: 'The weight of the dog',
    example: 10
  })
  @IsNumber()
  @IsPositive()
  weight!: number
}
