import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MatButtonModule  } from '@angular/material/button';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { TrafficLightTestComponent } from './trafficLightTest.component';
import { NavComponent } from './nav.component';
import { FailureDialog, Tltv1ComponentComponent, HelpDialog} from './tltv1.component';
import { SuccessComponent } from './success.component';
import { FailureComponent} from './failure.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePDFComponent } from './createPDF.component';
import { ClaimFormComponent } from './claimForm.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WebService } from './web.service';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test.component';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClaimFormHelpDialogComponent } from './dialogs/claim-form-help-dialog/claim-form-help-dialog.component';
import { MemberComponent } from './components/member/member.component';
import { MatDividerModule } from '@angular/material/divider';
import { NewClaimDialogComponent } from './dialogs/new-claim-dialog/new-claim-dialog.component';
import { LoggedInRouteGuard } from './guard/logged-in-route.guard';
import { LoggedInPageRouteGuard } from './guard/logged-in-page-route.guard';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const routes =
  [
    {path: '', component: WelcomeComponent},
    {path: 'trafficlighttest', component: TrafficLightTestComponent},
    {path: 'tltv1', component: Tltv1ComponentComponent},
    {path: 'success', component: SuccessComponent},
    {path: 'failure', component: FailureComponent},
    {path: 'testPDF/:id', component: CreatePDFComponent, canActivate: [LoggedInRouteGuard]},
    {path: 'claimForm/:id', component: ClaimFormComponent, canActivate: [LoggedInRouteGuard]},
    {path: 'test', component: TestComponent},
    {path: 'sign-in', component: SignInComponent, canActivate: [LoggedInPageRouteGuard]},
    {path: 'register-user', component: SignUpComponent, canActivate: [LoggedInPageRouteGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedInPageRouteGuard]},
    {path: 'members', component: MemberComponent, canActivate: [LoggedInRouteGuard]}
    // { path: 'verify-email-address', component: VerifyEmailComponent }
  ];

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, TrafficLightTestComponent, NavComponent,
    Tltv1ComponentComponent, SuccessComponent, FailureComponent, HelpDialog, FailureDialog,
    CreatePDFComponent, ClaimFormComponent, TestComponent, SignInComponent, SignUpComponent, ForgotPasswordComponent, FooterComponent,
    ClaimFormHelpDialogComponent, MemberComponent, NewClaimDialogComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatRadioModule, MatSelectModule, MatDialogModule, MatIconModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule, MatDividerModule, MatButtonModule, MatAutocompleteModule
  ],
  providers: [WebService, DataService, DatabaseService, AuthService, LoggedInRouteGuard, LoggedInPageRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

// TODO for the addition of payments
// https://stripe.com/docs/payments/integration-builder
// https://dashboard.stripe.com/test/dashboard
// https://medium.com/better-programming/payments-simplified-stripe-angular-express-4a88bf69f82e
// https://fireship.io/courses/stripe-js/
// https://fireship.io/lessons/stripe-elements-angular/


// https://www.youtube.com/watch?v=_lZc2O2oUJk
