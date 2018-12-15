import { Component, OnInit , OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { HttpService } from '../../core/services/httpService/http.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserserviceService } from '../../core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { CartserviceService } from 'src/app/core/services/cartService/cartservice.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private hide = true;
  public user: any = {};
  private message: any = {};
  selectService=0;
  private product;
  cartId=localStorage.getItem('cartId')
  private records={}
  private basic : any;
  private advance : any;
  private basicset = true;
  private advanceset = true;
  private  cards=[];
  private service:any;
  constructor(private snackBar: MatSnackBar, private myHttpService: HttpService,
    private userService:UserserviceService,private cartService:CartserviceService,
    private router:Router) { }
    ngOnInit() 
    {
      this.getMethod();
      this.getCarts();
    }
  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Enter Password' : '';
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  isLeftVisible = false;
  call() 
  {
    if (!this.email.invalid) {
      this.isLeftVisible = !this.isLeftVisible
    }
    else {
      this.snackBar.open("Provide", 'Email', {
        duration: 1500
      })
    }
  }
  /**
 * @description : Login API
 * 
 */
  login() 
  {
    this.userService.postLogin({
      "email": this.user.email,
      "password": this.user.password,
      "cartId" : localStorage.getItem("cartId")
  })  .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.snackBar.open("Logged In", 'Success', {
          duration: 1500
          
        })

      localStorage.setItem('token',data['id']);
      localStorage.setItem('email',data['email']);
      localStorage.setItem('firstName',data['firstName']);
      localStorage.setItem('lastName',data['lastName']);
      localStorage.setItem('userId',data['userId']);
      localStorage.setItem('imageUrl',data['imageUrl']); 
      this.router.navigateByUrl('homepage');
        
      
      var token=localStorage.getItem('token')
      var pushToken=localStorage.getItem('pushToken')
/**
 * @description : API for push Notifications
 */
      var body={
        'pushToken':pushToken
      }
      this.userService.pushTokens(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>
        {
        })
      },
        error => {
          this.snackBar.open("Email/Password Incorrect", 'Failed', {
            duration: 1500
          })
        })

  }
  selectCards(card) {
    this.selectService=1;
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

getCarts()
{
 this.cartService.getCart(this.cartId).pipe(takeUntil(this.destroy$))
  .subscribe(data => {
  LoggerService.log('data',data);
  this.product=data['data'].productId;
})
} 
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
