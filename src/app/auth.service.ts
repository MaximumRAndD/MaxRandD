import { Injectable, NgZone } from '@angular/core';
import { UserModel } from './model/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable
({
  providedIn: 'root'
})
export class AuthService
{

  // https://www.positronx.io/full-angular-7-firebase-authentication-system/

  userData: any;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router,
              public ngZone: NgZone)
  {
    this.afAuth.authState.subscribe(user =>
    {
      if (user)
      {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
      else
      {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in using email and password
  signIn(email, password): any
  {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) =>
      {
        this.ngZone.run(() =>
        {
          this.router.navigate(['']);
        });
        this.setUserData(result.user);
      }).catch((error) =>
      {
        window.alert(error.message);
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
      }).catch((error) => {
        window.alert(error.message);
      });
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
        window.alert(error);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean
  {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== true /*this true should be false when email verification is working*/) ? true : false;
  }

  // // Sign in using Google
  // googleAuth(): any
  // {
  //   return this.authLogin(new auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  // authLogin(provider): any
  // {
  //   return this.afAuth.signInWithPopup(provider)
  //     .then((result) =>
  //     {
  //       this.ngZone.run(() =>
  //       {
  //         this.router.navigate(['']);
  //       });
  //       this.setUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error);
  //     });
  // }

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
      this.router.navigate(['sign-in']);
    });
  }
}
