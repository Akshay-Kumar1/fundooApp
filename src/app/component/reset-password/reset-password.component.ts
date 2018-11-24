import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms'
import { HttpService } from '../../core/services/httpService/http.service'
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../../core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private snackBar: MatSnackBar, private myHttpService: HttpService, private router: Router,
    private route: ActivatedRoute,private userService:UserserviceService) { }
    private hide = true;
    private user: any = {}
    private records: any = {}

  public input = new FormData();
  public accessToken = this.route.snapshot.params.token;

  /**
 * @description : Reset Password API
 */
  reset() {

    var body = {
      "newPassword": this.user.password
    }

    this.input.append('newPassword', this.user.password);
    this.userService.resetPassword(body).pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.snackBar.open("Password Reset ",'Success',{
        duration:1500
      })
    }, error => {
      this.snackBar.open("Error",'Retry',{
        duration:1500
      })
    })
    console.error("accessToken", this.accessToken)
  }

  ngOnInit() {
  }

  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Enter Password' : '';
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  

}
