
import { ErrorHandler, Injectable} from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error) {
     LoggerService.error('Error Handler: ', error);
  }
}