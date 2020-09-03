import {Component, Input, OnInit, HostListener} from '@angular/core';

declare var StripeCheckout: StripeCheckoutStatic;

@Component
({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})

export class StripeCheckoutComponent implements OnInit
{

  constructor()
  {
  }

  @Input() amount;
  @Input() description;

  handler: StripeCheckoutHandler;

  confirmation: any;
  loading = false;

  ngOnInit(): any
  {
    this.handler = StripeCheckout.configure
    ({
      key: 'pk_test_51HMuwWDf2mQcDNZ9oeVmgCRTNFHELSPWniFGmbiRpCffFGD8zz4Mu49FUT9TKWQO3ubeF1zVW46dNiSh37a1PsuA00afbPNvWW',
      locale: 'auto',
      source: async (source) =>
      {
        this.loading = true;
        // TODO using firebase functions charge the account
        this.loading = false;
      }
    });
  }

  async checkout(e): Promise<any>
  {
    this.handler.open
    ({
      name: 'test Store',
      description: this.description,
      amount: this.amount
    });
    e.preventDefault();
  }

  @HostListener('window:popstate')
  onPopstate(): any
  {
    this.handler.close();
  }

}
