import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { TrafficLightTestComponent } from './trafficLightTest.component';
import { NavComponent } from './nav.component';
import { Tltv1ComponentComponent } from './tltv1.component';
import { SuccessComponent } from './success.component';
import { FailureComponent} from './failure.component';

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
    AppComponent, WelcomeComponent, TrafficLightTestComponent, NavComponent, Tltv1ComponentComponent, SuccessComponent, FailureComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
