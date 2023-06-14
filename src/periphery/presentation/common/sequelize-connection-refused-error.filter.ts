import {
  ArgumentsHost,
  InternalServerErrorException,
  Catch
} from '@nestjs/common'
import { ConnectionRefusedError } from 'sequelize'
import { BaseExceptionFilter } from '@nestjs/core'

@Catch(ConnectionRefusedError)
export class SequelizeConnectionRefusedErrorFilter extends BaseExceptionFilter {
  catch(exception: ConnectionRefusedError, host: ArgumentsHost): void {
    super.catch(
      new InternalServerErrorException(
        'Unable to establish a connection to the database',
        { cause: exception, description: 'Internal Server Error' }
      ),
      host
    )
  }
}
