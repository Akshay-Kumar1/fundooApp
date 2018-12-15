import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartserviceService } from 'src/app/core/services/cartService/cartservice.service';
import { UserserviceService } from 'src/app/core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { MatDialog } from '@angular/material';
import { CartdialogComponent } from '../cartdialog/cartdialog.component';
import { HttpService } from 'src/app/core/services/httpService/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-productcart',
  templateUrl: './productcart.component.html',
  styleUrls: ['./productcart.component.scss']
})
export class ProductcartComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private userService: UserserviceService, private dialog: MatDialog,
    private cartService: CartserviceService) { }
  private records = {};
  private cards = [];
  private service: any;
  private id: any;
  ngOnInit() {
    this.getMethod()
  }

  openDialog(data) {
    this.cartService.addToCart(
      {
        "productId": data.id
      }
    ).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('data', data)
        localStorage.setItem("cartId", data['data']['details'].id)
      })
    const dialogRef = this.dialog.open(CartdialogComponent, {
      width: '500px', height: '290px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getMethod() {
    this.records = this.userService.getData().pipe(takeUntil(this.destroy$)).subscribe(data => {
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
      var value = data["data"].data.name;
    })
  }
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
