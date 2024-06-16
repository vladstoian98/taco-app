import { Taco } from "./taco";

export enum Type {
    WRAP, PROTEIN, VEGGIES, CHEESE, SAUCE
  }
  
export class Ingredient {
    id?: string;
    name?: string;
    type?: Type;
    price?: number;
    tacos?: Taco[]; 
  }
  