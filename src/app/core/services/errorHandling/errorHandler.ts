import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }
  constructor(public snackBar: MatSnackBar) { }
  // handleError(error: Error | HttpErrorResponse) {

  //   if (error instanceof HttpErrorResponse) {
  //     if (!navigator.onLine) {
  //       this.snackBar.open(error.statusText, "No Internet Connection", {
  //         duration: 5000,
  //       });

  //     }
  //     if (error.status == 500) {
  //       this.snackBar.open(error.statusText, "500", {
  //         duration: 5000,
  //       });
  //     }
  //     if (error.status == 400) {
  //       this.snackBar.open(error.statusText, "400,Bad Request", {
  //         duration: 10000,
  //       });
  //     }
  //     if (error.status == 401) {
  //       this.snackBar.open(error.statusText, "401", {
  //         duration: 5000,
  //       });
  //     }
  //     if (error.status == 404) {
  //       this.snackBar.open(error.statusText, '404,not found', {
  //         duration: 5000,
  //       });
  //     }
  //     if (error.status == 408) {
  //       this.snackBar.open(error.statusText, "408", {
  //         duration: 3000,
  //       });
  //     }
  //     if (error.status == 422) {
  //       this.snackBar.open(error.statusText, "422,unprocessable", {
  //         duration: 3000,
  //       });
  //     }

  //   }
  //   else {
  //     this.snackBar.open("It happens : ", "Please provide" + error, {
  //       duration: 3000,
  //     });

  //   }
  // }
}
