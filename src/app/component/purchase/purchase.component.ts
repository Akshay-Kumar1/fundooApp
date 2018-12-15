import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserserviceService } from 'src/app/core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { CartserviceService } from 'src/app/core/services/cartService/cartservice.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit , OnDestroy{
destroy$: Subject<boolean> = new Subject<boolean>();
private cartId = localStorage.getItem('cartId');
public flag2 = false;
public flag = false;
public flag3 = false;
public cardObj = {};
public emptyCart = false;
public value = 25;
public address;
public addNotGiven = false;
public firstCss = true;
private details;
public forCss;

constructor(private productService: CartserviceService, 
  private userService: UserserviceService) { }

ngOnInit() {
  this.addNotGiven = false;
  if (localStorage.getItem("cartId") != null) {
    this.getCardDetails();
  }
}

getCardDetails() {
  this.productService.myCart()
    .subscribe((data) => {
      console.log(data['data']);
      this.details = data['data'][0].product
      console.log(this.details)
    },
    (error) => {
      console.log(error)
    }
    );
}


placeOrder() {
  if (localStorage.getItem("cartId") == null) {
    console.log("cartId is not present");
    return;
  }
  if (this.address != undefined) {
    let reqBody = {
      "cartId": localStorage.getItem("cartId"),
      "address": this.address
    }
    this.productService.placeOrder(reqBody)
      .subscribe((data) => {
        console.log(data);
        this.value = 100
        this.flag3 = true; this.flag = false;
        this.forCss = false

      });
  }
  else {
    console.log("enter address");
    this.addNotGiven = true

  }

}

  ngOnDestroy() 
  {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
  }
}
