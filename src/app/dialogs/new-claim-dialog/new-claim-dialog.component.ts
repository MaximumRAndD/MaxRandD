import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ClaimFormDialogDataModel} from '../../model/claim-form-dialog-data.model';
import { FormBuilder, Validators } from '@angular/forms';
import { claimDataLessThan, endDateMoreThanYear } from '../../validation/date.validation';
import {AuthService} from '../../auth.service';
import {DatabaseService} from '../../database.service';

@Component
({
  selector: 'app-new-claim-dialog',
  templateUrl: 'new-claim-dialog.component.html',
})

export class NewClaimDialogComponent
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClaimFormDialogDataModel, private formBuilder: FormBuilder,
              private authService: AuthService, private dbs: DatabaseService)
  {
    this.claimDetails = this.formBuilder.group
    (
      {
        name: ['', Validators.required],
        claimStartDate: ['', Validators.required],
        claimEndDate: ['', Validators.required]
      },
      {
        validators: [claimDataLessThan('claimStartDate', 'claimEndDate'),
          endDateMoreThanYear('claimStartDate', 'claimEndDate')]
      }
    );
  }

  claimDetails;
  claimEndDateDisabled = true;

  createClaim(): void
  {
    if (this.authService.isLoggedIn)
    {
      this.dbs.writeNewEmptyClaimForm(JSON.parse(localStorage.getItem('user')).uid, this.claimDetails.value.name,
        this.claimDetails.value.claimStartDate, this.claimDetails.value.claimEndDate);
    }
    else
    {
      console.log('not logged in');
    }
  }

  onClaimStartDateChange(): void
  {
    if (this.claimDetails.value.claimStartDate === null)
    {
      this.claimEndDateDisabled = true;
    }
    else
    {
      this.claimEndDateDisabled = false;
    }
  }

  isInvalid(control): any
  {
    return this.claimDetails.controls[control].invalid &&
      this.claimDetails.controls[control].touched;
  }

  isEmpty(control): any
  {
    return this.claimDetails.value[control] === '';
  }

  isRequiredFormEmpty(): any
  {
    return this.isEmpty('name') ||
      this.isEmpty('claimStartDate') ||
      this.isEmpty('claimEndDate');
  }

  isIncomplete(): any
  {
    return this.isInvalid('name') ||
      this.isInvalid('claimStartDate') ||
      this.isInvalid('claimEndDate') ||
      this.isRequiredFormEmpty();
  }
}
