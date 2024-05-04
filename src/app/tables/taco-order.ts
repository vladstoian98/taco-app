import { Drink } from "./drink";
import { Taco } from "./taco";
import { User } from "./user";

export class TacoOrder {
    id?: number;
    placedAt: Date;
    deliveryName: string = '';
    deliveryStreet: string = '';
    deliveryCity: string = '';
    deliveryState: string = '';
    deliveryZip: string = '';
    totalOrderPrice: number = 0;
    tacos?: Taco[];
    drinks: Drink[] = [];
    user?: User;

    constructor() {
      this.placedAt = new Date();
    }
    setTacoList(tacoList: Taco[]): void {
      this.tacos = tacoList;
    }

    setDrinkList(drinkList: Drink[]): void {
      this.drinks = drinkList;
    }

    toString(): string {
      return `
        ID: ${this.id}
        Placed At: ${this.placedAt}
        Delivery Name: ${this.deliveryName}
        Delivery Street: ${this.deliveryStreet}
        Delivery City: ${this.deliveryCity}
        Delivery State: ${this.deliveryState}
        Delivery Zip: ${this.deliveryZip}
        Tacos: ${this.tacos ? this.tacos.map(t => JSON.stringify(t)).join(', ') : 'None'}
        Drinks: ${this.drinks ? this.drinks.map(t => JSON.stringify(t)).join(', ') : 'None'}
        User: ${this.user ? JSON.stringify(this.user) : 'None'}
      `;
    }

  }