import { Injectable, NgZone } from '@angular/core';
import { UserModel } from './model/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { StripeCheckoutComponent } from './components/stripe-checkout/stripe-checkout.component';
import { first } from 'rxjs/operators';

@Injectable
({
  providedIn: 'root'
})
export class AuthService
{

  // Code adapted from:
  // https://www.positronx.io/full-angular-7-firebase-authentication-system/

  userData: any;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router,
              public ngZone: NgZone, private db: DatabaseService, private stripe: StripeCheckoutComponent)
  {
    this.afAuth.authState.subscribe(user =>
    {
      if (user)
      {
        this.userData = user;
        // localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('authSignedIn', 'true');
        // localStorage.setItem('backUpKey', this.userData.uid);
        // JSON.parse(localStorage.getItem('user'));
      }
      else
      {
        console.log('auth called - logged out');
        this.userData = null;
        // localStorage.setItem('user', null);
        localStorage.setItem('authSignedIn', null);
        // localStorage.setItem('backUpKey', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in using email and password
  signIn(email, password): any
  {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) =>
      {
        this.setUserData(result.user);
        this.ngZone.run(() =>
        {
          this.router.navigate(['members']).then(r => {});
        });
        console.log('signed in');
      }).catch((error) =>
      {
        console.log(error.code);
        this.displayAuthErrorMessage(error);
      });
  }

  // Sing up using email and password
  signUp(email, password): any
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) =>
      {
        // this.sendVerificationMail();
        this.setUserData(result.user);
        // this.db.writeNewEmptyClaimForm(result.user.uid, '', '', '');
        this.stripe.checkoutPassUid(result.user.uid).then(r => {});
        // this.ngZone.run(() =>
        // {
        //   this.router.navigate(['members']);
        // });
      }).catch((error) => {
        console.log(error.code);
        this.displayAuthErrorMessage(error);
      });
  }

  displayAuthErrorMessage(error): void
  {
    switch (error.code)
    {
      case 'auth/wrong-password':
        window.alert('An incorrect email and/or password has been entered, please try again');
        break;
      case 'auth/user-not-found':
        window.alert('An incorrect email and/or password has been entered, please try again');
        break;
      case 'auth/email-already-in-use':
        window.alert('An account already exists with this email address');
        break;
      case 'auth/weak-password':
        window.alert('Weak password: A password should be at least 6 characters long');
        break;
      default:
        window.alert('Note the auth/[ERROR_CODE] from the log' + error.message);
        break;
    }
  }

  // Send email Verification on Sign up
  // sendVerificationMail(): any
  // {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //     .then(() =>
  //     {
  //       this.router.navigate(['']);
  //     });
  // }

  // Reset forgot password
  forgotPassword(passwordResetEmail): any
  {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() =>
      {
        window.alert('Password reset Email sent, Please check your inbox');
      }).catch((error) =>
      {
        console.log(error.code);
        this.displayAuthErrorMessage(error);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean
  {
    const user = JSON.parse(localStorage.getItem('authSignedIn'));
    return (user !== null && user.emailVerified !== true /*this true should be false when email verification is working*/) ? true : false;
  }

  async getCurrentUserUid(): Promise<any>
  {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  /*
  Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
  */
  setUserData(user): any
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: UserModel =
      {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData,
      {
        merge: true
      });
  }

  // Sign out
  signOut(): any
  {
    return this.afAuth.signOut().then(() =>
    {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}
