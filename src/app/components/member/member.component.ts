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
  noClaims = false;

  ngOnInit(): any
  {
    this.loading = true;

    if (this.authService.isLoggedIn)
    {
      const uid = this.authService.getCurrentUserUid();

      if (uid !== null)
      {
        console.log('ngOnInit is logged in');
        this.readDb(uid);
      }
      else
      {
        console.log('ngOnInit uid is null');
        this.tryReloadUid();
      }
    }
    else
    {
      console.log('ngOnInit not logged in');
    }
  }

  readDb(uid): any
  {
    console.log('readDB is called');
    this.db.collection('users').doc(uid)
      .collection('claimForm').valueChanges({idField: 'claimID'}).subscribe(value =>
    {
      console.log(value);
      this.loading = false;
      this.claimFormArray = value;

      if (this.claimFormArray.length === 0)
      {
        this.noClaims = true;
      }
    });
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

  async tryReloadUid(): Promise<any>
  {
    console.log('tryReloadUid called');

    await this.delay(100);

    console.log('after delay');

    const uid = this.authService.getCurrentUserUid();

    if (uid !== null)
    {
      console.log('uid not ull called');
      this.readDb(uid);
    }
  }

  test(): any
  {
    const test =  this.authService.getCurrentUserUid();
    console.log(test);
  }

  async delay(ms: number): Promise<void>
  {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }
}
