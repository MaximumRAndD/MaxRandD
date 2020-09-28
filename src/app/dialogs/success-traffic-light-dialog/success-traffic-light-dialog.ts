import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component
({

  // tslint:disable-next-line:component-selector
  selector: 'successTrafficLightDialog',
  templateUrl: 'success-Traffic-Light-Dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class SuccessTrafficLightDialog
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {
    console.log(data);
  }

  displayMessage(index): boolean
  {
    return this.data[index] === 'no';
  }
}


