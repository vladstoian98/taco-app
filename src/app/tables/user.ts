import { TacoOrder } from './taco-order'; 

export class User {
  id: number | null = null;
  username: string | null = null;
  password: string | null = null;
  fullname: string | null = null;
  street: string | null = null;
  city: string | null = null;
  state: string | null = null;
  zip: string | null = null;
  authority: string | null = null;
  phoneNumber: string | null = null;
  tacoOrders?: TacoOrder[];
}