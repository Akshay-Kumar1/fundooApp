import { Component, OnInit , OnDestroy } from '@angular/core';
import { FormControl , Validators} from '@angular/forms'
import { HttpService } from '../../core/services/httpService/http.service'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UserserviceService } from '../../core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private hide=true;
  private user : any = {};
  email= new FormControl('', [Validators.required,Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
        }

  constructor(private myHttpService : HttpService, private snackBar:MatSnackBar,
    private userService:UserserviceService ) { }
  /**
 * @description : Reset Password API
 */
        reset()
        {
          this.userService.resetPost({
            "email" : this.user.email

          })
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.snackBar.open("Reset mail sent",' Check Email ',{
              duration:1500
            })
          })
          error => {
            LoggerService.error('error',error);
        }
        }
  ngOnInit() {}
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
