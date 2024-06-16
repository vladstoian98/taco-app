import { Ingredient } from "./ingredient";
import { TacoOrder } from "./taco-order";

export class Taco {
    id: number = 0;
    createdAt: Date;
    name: string = "";
    totalTacoPrice: number = 0;
    ingredients: Ingredient[] = []; 
    tacoOrder?: TacoOrder;
    constructor() {
      this.createdAt = new Date();
    }

  }
  