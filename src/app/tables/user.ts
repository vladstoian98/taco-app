import { TacoOrder } from './taco-order'; 

export interface User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  tacoOrders?: TacoOrder[];
}