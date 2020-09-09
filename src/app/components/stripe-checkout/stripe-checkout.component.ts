import {Component, Input, OnInit, HostListener, Injectable} from '@angular/core';
import { loadStripe } from '@stripe/stripe-js/pure';
import { WebService } from '../../web.service';


declare var StripeCheckout: StripeCheckoutStatic;

@Injectable()

export class StripeCheckoutComponent
{

  constructor(private webService: WebService)
  {
  }

  stripePromise = loadStripe('pk_test_51HMuwWDf2mQcDNZ9oeVmgCRTNFHELSPWniFGmbiRpCffFGD8zz4Mu49FUT9TKWQO3ubeF1zVW46dNiSh37a1PsuA00afbPNvWW');


  async checkout(): Promise<any>
  {
      // Get Stripe.js instance
      const stripe = await this.stripePromise;

      // Call your backend to create the Checkout Session

      const response = await this.webService.getStripeSessionKey();

      console.log(response);

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: response.id,
      });

      if (result.error)
      {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        window.alert(result.error.message);
      }
  }

  async checkoutPassUid(UserID): Promise<any>
  {
    // Get Stripe.js instance
    const stripe = await this.stripePromise;

    // Call your backend to create the Checkout Session

    const response = await this.webService.getStripeSessionKeyPassInUID(UserID);

    console.log(response);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    if (result.error)
    {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      window.alert(result.error.message);
    }
  }

  getStripeSessionKeyPassInUID
}
