import {Component, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData
{
  question: 'question1' | 'question2' | 'question3' | 'question4';
}

@Component
({
  selector: 'tltv1',
  templateUrl: './tltv1.component.html',
  styleUrls: ['./tltv1.component.css']
})

export class Tltv1ComponentComponent
{

  trafficLightForm;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              public dialog: MatDialog)
  {
    this.trafficLightForm = formBuilder.group(
      {
        question1: ['', Validators.required],
        question2: ['', Validators.required],
        question3: ['', Validators.required],
        question4: ['', Validators.required],
        question5: ['', Validators.required],
        question6: ['', Validators.required],
        question7: ['', Validators.required]
      });
  }

  onSubmit(): void
  {
    console.log(this.trafficLightForm.value);

    const response = new Array();

    const test = response.push(this.trafficLightForm.value.question1, this.trafficLightForm.value.question2,
      this.trafficLightForm.value.question3, this.trafficLightForm.value.question4, this.trafficLightForm.value.question5,
      this.trafficLightForm.value.question6, this.trafficLightForm.value.question7);

    // console.log(response[0]);


    for (const i in response)
    {
      console.log(i);
      if (response[i] === 'yes')
      {
        if (i === '6')
        {
          this.router.navigate(['../success'], {relativeTo: this.route});
        }
      }
      else
      {
        const dialogRef = this.dialog.open(FailureDialog,
          {
            data: response
          });
        break;
      }
    }

    console.log(response);
  }

  isInvalid(control): any
  {
    return this.trafficLightForm.controls[control].invalid &&
      this.trafficLightForm.controls[control].touched;
  }

  isUntouched(): any
  {
    return this.trafficLightForm.controls.question1.pristine ||
      this.trafficLightForm.controls.question2.pristine ||
      this.trafficLightForm.controls.question3.pristine ||
      this.trafficLightForm.controls.question4.pristine ||
      this.trafficLightForm.controls.question5.pristine ||
      this.trafficLightForm.controls.question6.pristine ||
      this.trafficLightForm.controls.question7.pristine;
  }

  isIncomplete(): any
  {
    return this.isInvalid('question1') ||
      this.isInvalid('question2') ||
      this.isInvalid('question3') ||
      this.isInvalid('question4') ||
      this.isInvalid('question5') ||
      this.isInvalid('question6') ||
      this.isInvalid('question7') ||
      this.isUntouched();
  }

  openHelpDialog(control): void
  {
    this.dialog.open(HelpDialog,
      {
        data:
          {
            question: control
          }
      });
  }
}

@Component
({
  selector: 'HelpDialog',
  templateUrl: 'helpDialog.html',
})

export class HelpDialog
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
  }
}

@Component
({
  selector: 'FailureDialog',
  templateUrl: 'failureDialog.html',
})

export class FailureDialog
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {
  }

  displayMessage(index): boolean
  {
    // console.log(this.data[index]);
    if (this.data[index] === 'no')
    {
      return true;
    }
    return false;
  }
}
