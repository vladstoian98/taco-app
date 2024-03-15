import { Component } from '@angular/core';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Taco } from 'src/app/tables/taco';
import { TacoOrder } from 'src/app/tables/taco-order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../../app.component.scss']
})
export class OrderComponent {
  tacos: Taco[] = [];
  order: TacoOrder = new TacoOrder();

  totalOrderCost: number = 0;

  deliveryInfoError: boolean = false;
  deliveryInfoErrorMessage: string = '';

  paymentInfoError: boolean = false;
  paymentInfoErrorMessage: string = '';

  tacosInOrderError: boolean = false;
  tacosInOrderErrorMessage: string = '';

  creditNumberRegex: RegExp = new RegExp('^[0-9]{13,16}$');
  ccExpirationRegex: RegExp = new RegExp('^(0[1-9]|1[0-2])\\/(\\d{2})$');
  ccCVVRegex: RegExp = new RegExp('^[0-9]{3}$');

  constructor(private orderService: OrderService,  private router: Router) {}

  ngOnInit(): void {
    this.getAvailableTacosForNewOrder();
  }

  getAvailableTacosForNewOrder(): void {
    this.orderService.getAvailableTacosForNewOrder().subscribe(
      data => {
        this.tacos = data;
        this.calculateTotalOrderCost();
      }
    );
  }

  deleteTaco(tacoId: number) {
    this.orderService.deleteSelectedTacoFromDatabase(tacoId).subscribe(
      response => {
        this.tacos = this.tacos.filter(taco => taco.id !== tacoId);
        console.log('Taco deleted ' + tacoId, response);
      },
      error => {
        console.error('Failed to delete taco', error);
      }
    );
  }

  processOrder(): void {
    if(this.order.deliveryName == "" || this.order.deliveryCity == "" || this.order.deliveryState == "" || 
        this.order.deliveryStreet == "" || this.order.deliveryZip== "") {
          this.deliveryInfoError = true;
          this.deliveryInfoErrorMessage =  "Please fill out the delivery info fields";
    } else {
      this.deliveryInfoError = false;
      this.deliveryInfoErrorMessage = '';
    } 

    if(this.creditNumberRegex.test(this.order.ccNumber) == false ||
        this.ccExpirationRegex.test(this.order.ccExpiration) == false || this.ccCVVRegex.test(this.order.ccCVV) == false) {
          this.paymentInfoError = true;
          this.paymentInfoErrorMessage = "Credit card credentials are invalid";
    } else {
      this.paymentInfoError = false;
      this.paymentInfoErrorMessage = '';
    }

    if(!this.tacos || !this.tacos.length) {
      this.tacosInOrderError = true;
      this.tacosInOrderErrorMessage = "Your order does not contain any items";
    }

    if(this.deliveryInfoError == false && this.paymentInfoError == false && this.tacosInOrderError == false) {
      this.order.setTacoList(this.tacos);

      console.log('This is the order: ' + this.order);
      
      this.orderService.processOrder(this.order).subscribe(
        response => {
          console.log('The order has been passed down ' + this.order, response);
        },
        error => {
          console.error('Failed to pass down the taco order.');
        }
      );

      this.deliveryInfoError = false;
      this.deliveryInfoErrorMessage = '';

      this.paymentInfoError = false;
      this.paymentInfoErrorMessage = '';

      this.tacosInOrderError = false;
      this.tacosInOrderErrorMessage = '';

      this.router.navigate(['/home']);
    }

  }

  redirectToOrderWindow(path: string) {
    
  }

  calculateTotalOrderCost(): void {
    this.totalOrderCost = this.tacos.reduce((sum, taco) => sum + taco.totalTacoPrice, 0);
  }

}
