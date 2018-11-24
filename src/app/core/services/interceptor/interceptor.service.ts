import { Injectable } from '@angular/core';
import {AuthServiceService} from '../authGuard/auth-service.service';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';


@Injectable()//{providedIn: 'root'}

export class InterceptService  implements HttpInterceptor {

	constructor(private authService: AuthServiceService) { }

	// intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    	// modify request
	    request = request.clone({
	      setHeaders: {
	        Authorization: `${localStorage.getItem('token')}`
	      }
	    });
	   
	  //  	LoggerService.log("----request start----");

	 	// LoggerService.log('request',request);

	 	// LoggerService.log("--- request end---");
 

	    return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	            // LoggerService.log(" status : OK");
	            // http response status code
	            // LoggerService.log('Event',event.status);
	          }
	        }, error => {
	   			// http response status code
	          	// LoggerService.log("----response start----");
	          	// LoggerService.error("status code:");
	          	// LoggerService.error(error.status);
	          	// LoggerService.error(error.message);
	          	// LoggerService.log("---response end---");

	        })
	      )

    };
  
 
}