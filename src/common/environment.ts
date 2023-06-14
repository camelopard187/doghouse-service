import { InternalServerErrorException } from '@nestjs/common'
import { IsEnum, IsString, validateSync } from 'class-validator'
import { plainToInstance } from 'class-transformer'

export enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test'
}

export class Environment {
  @IsEnum(NodeEnvironment) NODE_ENV!: NodeEnvironment

  @IsString() DATABASE_URL!: string
}

export class InvalidEnvironmentException extends InternalServerErrorException {}

export const validate = (config: Record<string, unknown>): Environment => {
  const validatedConfig = plainToInstance(Environment, config, {
    enableImplicitConversion: true
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0)
    throw new InvalidEnvironmentException(errors.toString())

  return validatedConfig
}
