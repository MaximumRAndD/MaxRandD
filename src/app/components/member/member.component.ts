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
    if (this.authService.isLoggedIn)
    {
      console.log('logged in');
    }
  }

  claimFormArray;

  ngOnInit(): any
  {
    console.log('ngOnInit called');
    if (this.authService.isLoggedIn)
    {
      console.log('ngOnInit is logged in');
      console.log(JSON.parse(localStorage.getItem('user')).uid);
      this.db.collection('users').doc(JSON.parse(localStorage.getItem('user')).uid)
        .collection('claimForm').valueChanges({idField: 'claimID'}).subscribe(value =>
      {
        console.log(value);
        this.claimFormArray = value;
      });
    }
    else
    {
      console.log('ngOnInit not logged in');
    }
  }

  newClaim(): void
  {
    this.stripe.checkout().then();
    // this.openHelpDialog();
  }

  openHelpDialog(): void
  {
    this.dialog.open(NewClaimDialogComponent);
  }

  test(): any
  {
    console.log(this.claimFormArray);
  }
}
