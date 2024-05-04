import { Component } from '@angular/core';
import { Drink } from 'src/app/tables/drink';
import { DrinksService } from 'src/app/service/drinks-service/drinks.service';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss',  '../../app.component.scss']
})
export class DrinksComponent {

  drinks: Drink[] = [];

  constructor(private drinkService: DrinksService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getDrinks();
  }

  getDrinks(): void {
    this.drinkService.getDrinks().subscribe(data => {
      this.drinks = data;
    });
  }

  addDrinkToOrder(drink: Drink): void {
      this.orderService.addDrinkToOrder(drink);
  }

  redirectToOrderWindow(path: string) {
    this.router.navigate([path]);
  }



}
