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
    ccNumber: string = '';
    ccExpiration: string = '';
    ccCVV: string = '';
    totalOrderPrice: number = 0;
    tacos?: Taco[];
    user?: User;

    constructor() {
      this.placedAt = new Date();
    }
    setTacoList(tacoList: Taco[]): void {
      this.tacos = tacoList;
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
        Credit Card Number: ${this.ccNumber}
        Credit Card Expiration: ${this.ccExpiration}
        Credit Card CVV: ${this.ccCVV}
        Tacos: ${this.tacos ? this.tacos.map(t => JSON.stringify(t)).join(', ') : 'None'}
        User: ${this.user ? JSON.stringify(this.user) : 'None'}
      `;
    }

  }