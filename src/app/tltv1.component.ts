import {Component, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessTrafficLightDialog } from './dialogs/success-traffic-light-dialog/success-traffic-light-dialog';

export interface DialogData
{
  question: 'question1' | 'question2' | 'question3' | 'question4' | 'question5' | 'question6' | 'question7';
}

@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'tltv1',
  templateUrl: './tltv1.component.html',
  styleUrls: ['./tltv1.component.css']
})

export class Tltv1ComponentComponent
{

  trafficLightForm;

  // question4Ans: string;

  question5Enable: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              public dialog: MatDialog)
  {
    this.trafficLightForm = formBuilder.group(
      {
        question1: ['', Validators.required],
        question2: ['', Validators.required],
        question3: ['', Validators.required],
        question4: ['', Validators.required],
        question5: '',
        question6: ['', Validators.required],
        question7: ['', Validators.required]
      });

    this.question5Enable = false;
  }

  onSubmit(): void
  {
    const response = [];
    const quetsion7 = [];

    const test = response.push(this.trafficLightForm.value.question1, this.trafficLightForm.value.question2,
      this.trafficLightForm.value.question3, this.trafficLightForm.value.question4, this.trafficLightForm.value.question5,
      this.trafficLightForm.value.question6/*, this.trafficLightForm.value.question7*/);

    const q7 = quetsion7.push(this.trafficLightForm.value.question7);

    for (const i in response)
    {
      if (response[i] === 'yes')
      {
        if (i === '5')
        {
          const dialogRef = this.dialog.open(SuccessTrafficLightDialog,
            {
              data: quetsion7
            });

          this.router.navigate(['../success'], {relativeTo: this.route});
        }
      }
      else
      {
        if (i === '3' || i === '4')
        {
          if (response[3] === 'yes' || response[4] === 'yes')
          { }
          else
          {
            const dialogRef = this.dialog.open(FailureDialog,
              {
                data: response
              });
            break;
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
    }
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
      this.trafficLightForm.controls.question6.pristine ||
      this.trafficLightForm.controls.question7.pristine;
  }

  isIncomplete(): any
  {
    return this.isInvalid('question1') ||
      this.isInvalid('question2') ||
      this.isInvalid('question3') ||
      this.isInvalid('question4') ||
      this.isInvalid('question6') ||
      this.isInvalid('question7') ||
      this.isQ5Invalid() ||
      this.isUntouched();
  }

  isQ5Invalid(): boolean
  {
    if (!this.displayQ5())
    {
      return false;
    }
    else
    {
      return !(this.displayQ5() && this.isQ5Valid());
    }
  }

  isQ5Valid(): boolean
  {
    return this.trafficLightForm.value.question5 !== '';
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

  async question4Answered(): Promise<void>
  {
    await this.delay(100);

    if (this.trafficLightForm.value.question4 === '')
    {
      this.question5Enable = false;
    }

    if (this.trafficLightForm.value.question4 === 'no')
    {
      this.question5Enable = true;
    }

    if (this.trafficLightForm.value.question4 === 'yes')
    {
      this.question5Enable = false;
    }
  }

  displayQ5(): boolean
  {
    if (this.question5Enable)
    {
      return true;
    }

    if (!this.question5Enable)
    {
      return false;
    }
  }

  async delay(ms: number): Promise<void>
  {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log(''));
  }
}

@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'HelpDialog',
  templateUrl: 'helpDialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class HelpDialog
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
  }
}

@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'FailureDialog',
  templateUrl: 'failureDialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class FailureDialog
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {
  }

  displayMessage(index): boolean
  {
    return this.data[index] === 'no';
  }
}
