import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
const ValidationError = mongoose.Error.ValidationError;

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log(response)
    response.status(400).json({ message: exception.message });
  }
}
