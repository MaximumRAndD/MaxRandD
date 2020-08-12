import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WebService } from './web.service';


@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'claimForm',
  templateUrl: './claimForm.component.html',
  styleUrls: ['./claimForm.component.css']
})

export class ClaimFormComponent
{

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              public dialog: MatDialog, private webService: WebService/*, private cd: ChangeDetectorRef*/)
  {
    this.claimForm = this.formBuilder.group
    (
      {
        name: ['', Validators.required],
        compName: ['', Validators.required],
        UTR: ['', Validators.compose([Validators.required, Validators.minLength(10),
          Validators.pattern('^(0|[1-9][0-9]*)$')])],
        compAdr: ['', Validators.required],
        claimStartDate: ['', Validators.required],
        claimEndDate: ['', Validators.required],
        // claimEndDate: [{value: '', disabled: true}, Validators.required]
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        addressLine3: [''],
        addressTown: ['', Validators.required],
        addressCounty: ['', Validators.required],
        addressPostcode: ['', Validators.required],
        projectSynopsis: ['', Validators.required],
        projectName: ['', Validators.required],
        projectDurationRadio: ['', Validators.required],
        projectStartDate: ['', Validators.required],
        projectEndDate: ['', Validators.required],
        projectRAndDDescription: ['', Validators.required],
        projectResearch: ['', Validators.required],
        problemToSolve: ['', Validators.required],
        projectLead: ['', Validators.required],
        projectLeadExperience: ['', Validators.required],
        uniqueProjectDevelopment: ['', Validators.required],
        projectProblems: '',
        projectProblemsDifficulty: '',
        projectProblemsSolved: '',
        projectTesting: ['', Validators.required],
        softwareAdvance: ['', Validators.required],
        stateAid: ['', Validators.required]

      }
    );
  }

  claimForm;
  claimEndDateDisabled = true;
  ProjectEndDateDisabled = true;
  maxClaimDate: Date;
  maxProjectDate: Date;

  claimDateValid: boolean;

  // TODO rename
  testArray;

  addressLine1;
  addressLine2;
  addressLine3;
  addressTown;
  addressCounty;
  projectSynopsisTemplate;
  projectRAndDDescriptionWordCount;

  @ViewChild('projectRAndDDescriptionText') text: ElementRef;

  projectRAndDDescriptionWords: any;

  isInvalid(control): any
  {
    return this.claimForm.controls[control].invalid &&
      this.claimForm.controls[control].touched;
  }

  // Does not work - move on to next part and come back to this
  onClaimStartDateChange(): void
  {
    if (this.claimForm.value.claimStartDate === null)
    {
      this.claimEndDateDisabled = true;

      const currentYear = new Date().getFullYear();
      this.maxClaimDate = new Date(currentYear + 1, 0, 0);
    }
    else
    {
      this.claimEndDateDisabled = false;
    }
  }

  onProjectStartDateChange(): void
  {
    if (this.claimForm.value.projectStartDate === null)
    {
      this.ProjectEndDateDisabled = true;

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDate = new Date().getDate();
      this.maxProjectDate = new Date(currentYear + 0, currentMonth + 0, currentDate + 0);
    }
    else
    {
      this.ProjectEndDateDisabled = false;
    }
  }



  isClaimEndDateValid(): void
  {
    if (this.claimForm.value.claimEndDate !== '')
    {
      const startDate = new Date (this.claimForm.value.claimStartDate);
      const endDate = new Date (this.claimForm.value.claimEndDate);

      const startDatePlusYear = new Date (startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

      if (endDate <= startDatePlusYear)
      {
        this.claimDateValid = true;
      }
      else
      {
        this.claimDateValid = false;
      }
    }
    else
    {
    }
  }

  // TODO error handling
   async onPostcodeSearch(): Promise<void>
   {
     const response = await this.webService.getAddresses(this.claimForm.value.addressPostcode);
     // console.log(response);
     this.testArray = response.addresses;
     // console.log(this.testArray[1]);
   }

  findAddressArrayIndex(line1): void
  {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.testArray.length; i++)
    {
      if (this.testArray[i].line_1 === line1)
      {
        this.fillAddressInput(i);
      }
    }
  }

  fillAddressInput(index): void
  {
    this.addressLine1 = this.testArray[index].line_1;
    this.addressLine2 = this.testArray[index].line_2;
    this.addressLine3 = this.testArray[index].line_3;
    this.addressTown = this.testArray[index].town_or_city;
    this.addressCounty = this.testArray[index].county;
  }

  useTemplateProjectSynopsis(option): void
  {
    if (option === 'option1')
    {
      this.projectSynopsisTemplate = 'Template for option 1';
    }
    if (option === 'option2')
    {
      this.projectSynopsisTemplate = 'Template for option 2';
    }
    if (option === 'option3')
    {
      this.projectSynopsisTemplate = 'Template for option 3';
    }
  }

  projectRAndDDescriptionWordCounter(): void
  {
    this.projectRAndDDescriptionWordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.projectRAndDDescriptionWords = this.projectRAndDDescriptionWordCount ? this.projectRAndDDescriptionWordCount.length : 0;
  }

  submitForm(): any
  {
    console.log(this.claimForm.value);
  }
}

function claimDateValidator(control: AbstractControl): {[key: string]: boolean | null}
{
  return null;
}
