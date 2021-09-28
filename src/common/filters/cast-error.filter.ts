import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Error, CastError } from 'mongoose';

@Catch(Error.CastError)
export class CastErrorFilter implements ExceptionFilter {
  catch(exception: CastError, host: ArgumentsHost) {
    if ('name' in exception && exception.name === 'CastError') {
      const response = host.switchToHttp().getResponse();
      Logger.log(exception);
      response.status(400).json({ message: 'Failed to cast parameters' });
    }
  }
}
