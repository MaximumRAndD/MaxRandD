import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  templateUrl: 'test.component.html',
  styleUrls: ['app.component.css']
})
export class TestComponent implements OnInit
{

  constructor(private db: AngularFirestore)
  {
  }


  ngOnInit(): any
  {
  }

  // not working

  // checkout(): any
  // {
  //   const dialogRef = this.dialog.open(StripePaymentComponent, {
  //     // opening dialog here which will give us back stripeToken
  //     data: {totalAmount: this.getTotal()},
  //   });
  //   dialogRef.afterClosed()
  //     // waiting for stripe token that will be given back
  //     .subscribe((result: any) =>
  //     {
  //       if (result) {
  //         this.createOrder(result.token.id);
  //       }
  //     });
  // }


}
