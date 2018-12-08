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
  constructor(private userService:UserserviceService,private cartService:CartserviceService) { }
  private records={}
  private cards=[]
  private value;
  private product;
  private productName;
  private productDate;
  cartId = localStorage.getItem('cartId')
  ngOnInit() 
  {
    this.getCarts(); 
  }
  getCarts()
  {
  this.cartService.getCart(this.cartId).pipe(takeUntil(this.destroy$))
  .subscribe(data => {
    LoggerService.log('data',data);
    this.product=data['data'].price;
    this.productName=data['data']['product'].name
    this.productDate=data['data'].modifiedDate
  })
  
} 
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}
