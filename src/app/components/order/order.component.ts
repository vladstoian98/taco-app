import { OrderService } from 'src/app/service/order-service/order.service';
import { StripeService } from 'src/app/service/stripe-service/stripe.service';
import { Taco } from 'src/app/tables/taco';
import { TacoOrder } from 'src/app/tables/taco-order';
import { Router } from '@angular/router';
import { Drink } from 'src/app/tables/drink';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeElement, StripeCardElement, StripeCardNumberElement, StripeCardExpiryElement,StripeCardCvcElement} from '@stripe/stripe-js';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', '../../app.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('cardInfo', { static: true }) cardInfo!: ElementRef;

  stripe: Stripe | null = null;   
  card!: StripeCardElement;  
  cardErrors: string | undefined = "";

  cardNumber!: StripeCardNumberElement;
  cardExpiry!: StripeCardExpiryElement;
  cardCvc!: StripeCardCvcElement;

  tacos: Taco[] = [];
  drinksInOrder: Drink[] = [];
  order: TacoOrder = new TacoOrder();

  totalOrderCost: number = 0;

  deliveryInfoError: boolean = false;
  deliveryInfoErrorMessage: string = '';

  paymentInfoError: boolean = false;
  paymentInfoErrorMessage: string = '';

  truePaymentConfirmation: boolean = false;

  tacosInOrderError: boolean = false;
  tacosInOrderErrorMessage: string = '';

  creditNumberRegex: RegExp = new RegExp('^[0-9]{13,16}$');
  ccExpirationRegex: RegExp = new RegExp('^(0[1-9]|1[0-2])\\/(\\d{2})$');
  ccCVVRegex: RegExp = new RegExp('^[0-9]{3}$');

  constructor(private orderService: OrderService, private stripeService: StripeService, 
    private router: Router, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.getAvailableTacosAndDrinksForNewOrder();
    await this.setupStripe();
  }

  getAvailableTacosAndDrinksForNewOrder(): void {
    this.orderService.getAvailableTacosForNewOrder().subscribe(
      data => {
        this.tacos = data;
        this.calculateTotalOrderCost();
      }
    );

    this.orderService.getDrinksInsideOrder().subscribe(
      data => {
        this.drinksInOrder = data;
        this.calculateTotalOrderCost();
      }
    );
  }

  async setupStripe(): Promise<void> {
    console.log("setupStripe has started")
    this.stripe = await loadStripe('pk_test_51P52ZzD2ntivWUYTsH7hpabANgKvChOPJb910MIJ2FeQieBugZFYPlz5ES8Bpc8oZAcplapjfi6l3XAtfXWLdmQH00En8LXWFW');
    if (this.stripe) {
        const elements = this.stripe.elements();
        
        const style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        this.cardNumber = elements.create('cardNumber', { style: style });
        this.cardNumber.mount('#card-number-element');

        this.cardExpiry = elements.create('cardExpiry', { style: style });
        this.cardExpiry.mount('#card-expiry-element');

        this.cardCvc = elements.create('cardCvc', { style: style });
        this.cardCvc.mount('#card-cvc-element');

        const handleEvent = (event: any) => {
            this.cardErrors = event.error ? event.error.message : null;
        };

        this.cardNumber.on('change', handleEvent);
        this.cardExpiry.on('change', handleEvent);
        this.cardCvc.on('change', handleEvent);
    }
  } 


  deleteTaco(tacoId: number) {
    this.orderService.deleteSelectedTacoFromDatabase(tacoId).subscribe(
      response => {
        this.tacos = this.tacos.filter(taco => taco.id !== tacoId);
        this.calculateTotalOrderCost();
        this.cdr.detectChanges();
        console.log('Taco deleted ' + tacoId, response);
      },
      error => {
        console.error('Failed to delete taco', error);
      }
    );
  }

  deleteDrink(drinkId?: number) {
    this.orderService.deleteDrink(drinkId);

    this.orderService.getDrinksInsideOrder().subscribe(
      data => {
        this.drinksInOrder = data;
        this.calculateTotalOrderCost(); 
        this.cdr.detectChanges();
      }
    );
  }

  processOrder(): void {
    if(this.order.deliveryName == "" || this.order.deliveryCity == "" || this.order.deliveryState == "" || 
        this.order.deliveryStreet == "" || this.order.deliveryZip== "") {
          this.deliveryInfoError = true;
          this.deliveryInfoErrorMessage =  "Please fill out the delivery info fields";
    } else {
      this.deliveryInfoError = false;
      this.deliveryInfoErrorMessage = '';
    } 

    if(!this.tacos || !this.tacos.length) {
      this.tacosInOrderError = true;
      this.tacosInOrderErrorMessage = "Your order does not contain any items";
    }

    if(this.deliveryInfoError == false && this.paymentInfoError == false && this.tacosInOrderError == false) {
      this.stripeService.createPaymentIntent(this.totalOrderCost * 100).subscribe({
        next: (data) => {
          this.stripe?.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: this.cardNumber,
              billing_details: {
                name: 'Example John'
              }
            }
          }).then(result => {
            if(result.error) {
              console.error('Payment error: ', result.error.message);
              this.cardErrors = result.error.message;
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
              console.log('Payment successful!');
              this.order.setTacoList(this.tacos);
              this.order.setDrinkList(this.drinksInOrder);
              this.drinksInOrder = [];
              localStorage.removeItem(`drinksInOrder`);

              console.log('This is the order: ' + this.order);
              
              this.orderService.processOrder(this.order).subscribe(
                response => {
                  console.log('The order has been passed down ' + this.order, response);
                },
                error => {
                  console.error('Failed to pass down the taco order.');
                }
              );

              this.deliveryInfoError = false;
              this.deliveryInfoErrorMessage = '';

              this.paymentInfoError = false;
              this.paymentInfoErrorMessage = '';

              this.tacosInOrderError = false;
              this.tacosInOrderErrorMessage = '';

              this.router.navigate(['/home']);
            }
          });
        },
        error: (error) => {
          console.error('Error creating payment intent: ', error);
        }
      });
    }
  }

  redirectToOrderWindow(path: string) {
    
  }

  calculateTotalOrderCost(): void {
    if(this.drinksInOrder[0] != null) {
      this.totalOrderCost = this.drinksInOrder.reduce((sum, drink) => sum + (drink.price ?? 0), 0);

      this.totalOrderCost += this.tacos.reduce((sum, taco) => sum + taco.totalTacoPrice, 0);

      this.totalOrderCost = parseFloat(this.totalOrderCost.toFixed(1));
    }
  }
}
