import { Taco } from "./taco";

export enum Type {
    WRAP, PROTEIN, VEGGIES, CHEESE, SAUCE
  }
  
export interface Ingredient {
    id: string;
    name: string;
    type: Type;
    price: number;
    tacos?: Taco[]; // assuming you have Taco interface defined
  }
  