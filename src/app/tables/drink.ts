import { TacoOrder } from "./taco-order";

  export class Drink {
    id?: number;
    createdAt: Date = new Date();
    name?: string;
    liters?: number;
    price?: number;
    associatedPhotoName?: string;
    tacoOrders?: TacoOrder[];
  }
  