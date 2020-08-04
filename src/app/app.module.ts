import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { TrafficLightTestComponent } from './trafficLightTest.component';
import { NavComponent } from './nav.component';
import {FailureDialog, Tltv1ComponentComponent, HelpDialog} from './tltv1.component';
import { SuccessComponent } from './success.component';
import { FailureComponent} from './failure.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes =
  [{
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'trafficlighttest',
    component: TrafficLightTestComponent
  },
  {
    path: 'tltv1',
    component: Tltv1ComponentComponent
  },
  {
   path: 'success',
   component: SuccessComponent
  },
  {
    path: 'failure',
    component: FailureComponent
  }];

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, TrafficLightTestComponent, NavComponent,
    Tltv1ComponentComponent, SuccessComponent, FailureComponent, HelpDialog, FailureDialog
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatRadioModule, MatSelectModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
