import { Component } from '@angular/core';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Taco } from 'src/app/tables/taco';
import { TacoOrder } from 'src/app/tables/taco-order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../../app.component.scss']
})
export class OrderComponent {
  tacos: Taco[] = [];
  order: TacoOrder = new TacoOrder();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAvailableTacosForNewOrder();
  }

  getAvailableTacosForNewOrder(): void {
    this.orderService.getAvailableTacosForNewOrder().subscribe(
      data => this.tacos = data
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

  }

}
