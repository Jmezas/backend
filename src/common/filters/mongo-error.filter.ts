import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    switch (exception.code) {
      case 11000:
        response.status(400).json({ message: 'Esta entrada ya existe', error: { error: '0009' } });
        break;
      default:
        response.status(500).json({ message: 'Error de servidor interno' });
        break;
    }
  }
}
