import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClaimFormDialogDataModel} from '../../model/claim-form-dialog-data.model';

@Component
({
  selector: 'app-claim-form-help',
  templateUrl: 'claim-form-help-dialog.component.html',
})

export class ClaimFormHelpDialogComponent
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClaimFormDialogDataModel)
  { }
}
