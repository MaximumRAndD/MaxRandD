import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component
({
  selector: 'tltv1',
  templateUrl: './tltv1.component.html',
  styleUrls: ['./tltv1.component.css']
})

export class Tltv1ComponentComponent
{

  trafficLightForm;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute)
  {
    this.trafficLightForm = formBuilder.group(
      {
        question1: ['', Validators.required],
        question2: ['', Validators.required],
        question3: ['', Validators.required]
      });
  }

  onSubmit()
  {
    console.log(this.trafficLightForm.value);

    if (this.trafficLightForm.value.question1 === 'yes')
    {
      if (this.trafficLightForm.value.question2 === 'yes')
      {
        if (this.trafficLightForm.value.question3 === 'yes')
        {
          console.log('green');
          this.router.navigate(['../success'], {relativeTo: this.route});
        }
        else
        {
          console.log('red');
          this.router.navigate(['../failure'], {relativeTo: this.route});
        }
      }
      else
      {
        console.log('red');
        this.router.navigate(['../failure'], {relativeTo: this.route});
      }
    }
    else
    {
      console.log('red');
      this.router.navigate(['../failure'], {relativeTo: this.route});
    }
  }

  isInvalid(control)
  {
    return this.trafficLightForm.controls[control].invalid &&
      this.trafficLightForm.controls[control].touched;
  }

  isUntouched()
  {
    return this.trafficLightForm.controls.question1.pristine ||
      this.trafficLightForm.controls.question2.pristine ||
      this.trafficLightForm.controls.question3.pristine;
  }

  isIncomplete()
  {
    return this.isInvalid('question1') ||
      this.isInvalid('question2') ||
      this.isInvalid('question3') ||
      this.isUntouched();
  }
}
