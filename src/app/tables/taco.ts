import { Ingredient } from "./ingredient";
import { TacoOrder } from "./taco-order";

export class Taco {
    id: number = 0;
    createdAt: Date;
    name: string = "";
    ingredients: Ingredient[] = []; // replace 'any' with the actual Ingredient type if available
    tacoOrder?: TacoOrder; // replace 'any' with the actual TacoOrder type if available

    constructor() {
      this.createdAt = new Date();
    }

  }
  