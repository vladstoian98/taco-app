import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Taco } from '../../tables/taco';
import { TacoOrder } from 'src/app/tables/taco-order';
import { Drink } from 'src/app/tables/drink';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/orders'

  private currentOrder: TacoOrder = new TacoOrder();

  constructor(private http: HttpClient) { }

  httpOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });

    return { headers: headers};
  }

  getAvailableTacosForNewOrder(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${this.apiUrl}/new`, this.httpOptions());
  }

  deleteSelectedTacoFromDatabase(tacoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/taco/${tacoId}`, this.httpOptions());
  }

  processOrder(order: TacoOrder): Observable<TacoOrder> {
    return this.http.post<TacoOrder>(`${this.apiUrl}/new`, order, this.httpOptions());
  }

  addDrinkToOrder(drink: Drink): void {
    // First, load the current drinks from local storage to ensure we're not overwriting previous drinks.
    const drinksString = localStorage.getItem('drinksInOrder');
    if (drinksString) {
        try {
            this.currentOrder.drinks = JSON.parse(drinksString);
        } catch (error) {
            console.error('Failed to parse drinks from localStorage', error);
            this.currentOrder.drinks = []; // Reset to empty array in case of error
        }
    }

    // Now, add the new drink to the array
    this.currentOrder.drinks.push(drink);

    // Finally, update the local storage with the new state
    localStorage.setItem('drinksInOrder', JSON.stringify(this.currentOrder.drinks));
  }


  getDrinksInsideOrder(): Observable<Drink[]> {
    const drinksString = localStorage.getItem('drinksInOrder');
    let drinks: Drink[] = [];

    if (drinksString) {
      try {
        drinks = JSON.parse(drinksString);
      } catch (error) {
        console.error('Failed to parse drinks from localStorage', error);
      }
    }

    return of(drinks);
  }

  deleteDrink(drinkId?: number) {
    const drinksString = localStorage.getItem('drinksInOrder');
    if (drinksString) {
        try {
            this.currentOrder.drinks = JSON.parse(drinksString);
        } catch (error) {
            console.error('Failed to parse drinks from localStorage', error);
            this.currentOrder.drinks = [];
        }
    }
    
     const index = this.currentOrder.drinks.findIndex(drink => drink.id === drinkId);

     if (index !== -1) {
         this.currentOrder.drinks.splice(index, 1);
     }

    localStorage.setItem(`drinksInOrder`, JSON.stringify(this.currentOrder.drinks));
  }
} 


