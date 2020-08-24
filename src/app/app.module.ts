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
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import { TestComponent } from './test.component';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';

const routes =
  [
    {path: '', component: WelcomeComponent},
    {path: 'trafficlighttest', component: TrafficLightTestComponent},
    {path: 'tltv1', component: Tltv1ComponentComponent},
    {path: 'success', component: SuccessComponent},
    {path: 'failure', component: FailureComponent},
    {path: 'testPDF', component: CreatePDFComponent},
    {path: 'claimForm', component: ClaimFormComponent},
    {path: 'test', component: TestComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'register-user', component: SignUpComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent}
    // { path: 'verify-email-address', component: VerifyEmailComponent }
  ];

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, TrafficLightTestComponent, NavComponent,
    Tltv1ComponentComponent, SuccessComponent, FailureComponent, HelpDialog, FailureDialog,
    CreatePDFComponent, ClaimFormComponent, TestComponent, SignInComponent, SignUpComponent, ForgotPasswordComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatRadioModule, MatSelectModule, MatDialogModule, MatIconModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule
  ],
  providers: [WebService, DataService, DatabaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
