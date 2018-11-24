import { Component, OnInit , OnDestroy} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from '../../core/services/httpService/http.service'
import { FormControl, FormGroup , Validators} from '@angular/forms'
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from '../../core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
/**
 * @description : animation for login page in decorator
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('basicani', [
      // ...
      state('open', style({
        background: 'blue'
      })),
      state('closed', style({
        background: 'lightblue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),

    trigger('advanceani', [
      // ...
      state('open', style({
        background: 'yellow'
      })),
      state('closed', style({
        background: 'lightgreen'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class SignupComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**
 * @description : Validations using custom Regex Patterns
 */
constructor(private userService:UserserviceService ,private myHttpService : HttpService ,
   private snackBar:MatSnackBar) { }

ngOnInit() 
{
  this.getMethod()
}
private hide=true;
  email= new FormControl('', [Validators.required,Validators.email]);
  firstname= new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]);
  lastname= new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')])
  getErrorMessagefirstName()
  {
    return this.firstname.hasError('required') ? 'First Name is Required' : 
    this.firstname.hasError('pattern') ? 'Invalid First Name' :
    '';
  }
  username= new FormControl('', [Validators.required]);
  getErrorMessageuserName()
  {
    return this.username.hasError('required') ? 'Username is Required' : '';
  }
  getErrorMessagelastName()
  {
    return this.lastname.hasError('required') ? 'Last Name is Required' : 
    this.lastname.hasError('pattern') ? 'Invalid Last Name' :
    '';
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
        }
  phone= new FormControl('', [Validators.required,Validators.pattern('[6-9][0-9]*')])
  getErrorMessagePhone()
  {
    return this.phone.hasError('required') ? 'Phone Number is Required' : 
    this.phone.hasError('pattern') ? 'Invalid Phone Number' :'';
  }
  password= new FormControl('', [Validators.required]);
  getErrorMessagePassword()
  {
    return this.password.hasError('required') ? 'Enter Password' : '';
  }

  private records={}
  private basic : any;
  private advance : any;
  private basicset = true;
  private advanceset = true;
  private user: any = {}
  private  cards=[];
  private service:any;
  /**
 * @description : User Sign-up API
 */
  onSubmit()
  {
    this.userService.postData(
  {
  "firstName": this.user.firstName,
  "lastName": this.user.lastName,
  "service": this.service,
  "email": this.user.email,
  "emailVerified": true,
  "password": this.user.password,
  }).pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.snackBar.open("Registration Complete",' Success ',{
            duration:1500
          })
        })
       
      }
    
    /**
 * @description : Getting Service Cards
 */
      selectCards(card) {
        this.service = card.name;
        card.select = true;
        for (var i = 0; i < this.cards.length; i++) {
          if (card.name == this.cards[i].name) {
            continue;
          }
          this.cards[i].select = false;
        }
      }

getMethod()
{
  this.records = this.userService.getData().pipe(takeUntil(this.destroy$)).subscribe(data => {
    for (var i = 0; i < data["data"].data.length; i++) {
      data["data"].data[i].select = false;
      this.cards.push(data["data"].data[i]);
    }
   var value = data["data"].data.name;
  })
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

}
