import {Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth.service';
import { DatabaseService } from '../../database.service';
import {MatDialog} from '@angular/material/dialog';
import {NewClaimDialogComponent} from '../../dialogs/new-claim-dialog/new-claim-dialog.component';
import { StripeCheckoutComponent } from '../stripe-checkout/stripe-checkout.component';

@Component(
  {
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
  })
export class MemberComponent implements OnInit
{
  constructor(private db: AngularFirestore, private authService: AuthService, private dbs: DatabaseService,
              public dialog: MatDialog, private stripe: StripeCheckoutComponent)
  {
  }

  claimFormArray;
  loading = false;
  loadingPayment = false;
  noClaims = false;
  user;

  async ngOnInit(): Promise<any>
  {
    this.loading = true;

    if (this.authService.isLoggedIn)
    {
      this.user = await this.authService.getCurrentUserUid();
      const userUid = this.user.uid;

      this.readDb(userUid);
    }
    else
    {
      console.log('ngOnInit not logged in');
    }
  }

  // Will retrieve the users claims
  readDb(user): any
  {
    this.db.collection('users').doc(user)
      .collection('claimForm').valueChanges({idField: 'claimID'}).subscribe(value =>
    {
      this.loading = false;
      this.claimFormArray = value;

      if (this.claimFormArray.length === 0)
      {
        this.noClaims = true;
      }
    });
  }

  // Will make a call the nodeJS server to make the stripe payment
  newClaim(): void
  {
    this.loadingPayment = true;
    this.stripe.checkoutPassUid(this.user.uid).then();
    // this.openHelpDialog();
  }

  // unused
  openHelpDialog(): void
  {
    this.dialog.open(NewClaimDialogComponent);
  }

  // connected to a 'test' btn
  async test(): Promise<any>
  {

  }

}
