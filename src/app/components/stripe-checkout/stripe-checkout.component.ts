import { Component, Input, OnInit, HostListener } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js/pure';
import { WebService } from '../../web.service';


declare var StripeCheckout: StripeCheckoutStatic;

@Component
({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})

export class StripeCheckoutComponent implements OnInit
{

  constructor(private webService: WebService)
  {
  }

  stripePromise = loadStripe('pk_test_51HMuwWDf2mQcDNZ9oeVmgCRTNFHELSPWniFGmbiRpCffFGD8zz4Mu49FUT9TKWQO3ubeF1zVW46dNiSh37a1PsuA00afbPNvWW');

  // @Input() amount;
  // @Input() description;
  //
  // handler: StripeCheckoutHandler;
  //
  // confirmation: any;
  // loading = false;

  // stripe = Stripe('pk_test_51HMuwWDf2mQcDNZ9oeVmgCRTNFHELSPWniFGmbiRpCffFGD8zz4Mu49FUT9TKWQO3ubeF1zVW46dNiSh37a1PsuA00afbPNvWW');

  ngOnInit(): any
  {
    // this.handler = StripeCheckout.configure
    // ({
    //   key: 'pk_test_51HMuwWDf2mQcDNZ9oeVmgCRTNFHELSPWniFGmbiRpCffFGD8zz4Mu49FUT9TKWQO3ubeF1zVW46dNiSh37a1PsuA00afbPNvWW',
    //   locale: 'auto',
    //   source: async (source) =>
    //   {
    //     this.loading = true;
    //     // TODO using firebase functions charge the account
    //     this.loading = false;
    //   }
    // });
  }

  // async checkout(e): Promise<any>
  // {
  //   this.handler.open
  //   ({
  //     name: 'test Store',
  //     description: this.description,
  //     amount: this.amount
  //   });
  //   e.preventDefault();
  // }
  //
  // @HostListener('window:popstate')
  // onPopstate(): any
  // {
  //   this.handler.close();
  // }

  async test(): Promise<any>
  {

      // Get Stripe.js instance
      const stripe = await this.stripePromise;

      // Call your backend to create the Checkout Session
      // const response = await fetch('http://localhost:4242/create-checkout-session', {method: 'POST'});

      const response = await this.webService.getStripeSessionKey();

      console.log(response);

      // const session = await response.json();

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: response.id,
      });

      if (result.error)
      {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }


      // other method

      // fetch('http://localhost:4242/create-checkout-session', {
      //   method: 'POST',
      // })
      //   // tslint:disable-next-line:only-arrow-functions typedef
      //   .then(function(response) {
      //     return response.json();
      //   })
      //   // tslint:disable-next-line:only-arrow-functions typedef
      //   .then(function(session) {
      //     return this.stripe.redirectToCheckout({ sessionId: session.id });
      //   })
      //   // tslint:disable-next-line:only-arrow-functions typedef
      //   .then(function(result) {
      //     // If `redirectToCheckout` fails due to a browser or network
      //     // error, you should display the localized error message to your
      //     // customer using `error.message`.
      //     if (result.error) {
      //       alert(result.error.message);
      //     }
      //   })
      //   // tslint:disable-next-line:only-arrow-functions typedef
      //   .catch(function(error) {
      //     console.error('Error:', error);
      //   });

  }
}
