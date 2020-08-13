import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WebService } from './web.service';
import { dataLessThan , endDateMoreThanYear } from './date.validation';
import { DataService } from './data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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
              public dialog: MatDialog, private webService: WebService, private dataService: DataService,
              private db: AngularFirestore)
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
      },
      {
        validators: [dataLessThan('claimStartDate', 'claimEndDate'),
        endDateMoreThanYear('claimStartDate', 'claimEndDate')]
      }
    );

    this.projectDurationShowDatePicker = false;
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
  projectDurationShowDatePicker: boolean;

  @ViewChild('projectRAndDDescriptionText') text: ElementRef;

  projectRAndDDescriptionWords: any;

  // TODO make this into a service with all db activities
  saveFormToDB()
  {
    this.db.collection('claimForm').doc('testUser').set
    ({
      name: this.claimForm.value.name,
      compName: this.claimForm.value.compName,
      UTR: this.claimForm.value.UTR,
      compAdr: this.claimForm.value.compAdr,
      claimStartDate: this.claimForm.value.claimStartDate,
      claimEndDate: this.claimForm.value.claimEndDate,
      addressLine1: this.claimForm.value.addressLine1,
      addressLine2: this.claimForm.value.addressLine2,
      addressLine3: this.claimForm.value.addressLine3,
      addressTown: this.claimForm.value.addressTown,
      addressCounty: this.claimForm.value.addressCounty,
      addressPostcode: this.claimForm.value.addressPostcode,
      projectSynopsis: this.claimForm.value.projectSynopsis,
      projectName: this.claimForm.value.projectName,
      projectDurationRadio: this.claimForm.value.projectDurationRadio,
      projectStartDate: this.claimForm.value.projectStartDate,
      projectEndDate: this.claimForm.value.projectEndDate,
      projectRAndDDescription: this.claimForm.value.projectRAndDDescription,
      projectResearch: this.claimForm.value.projectResearch,
      problemToSolve: this.claimForm.value.problemToSolve,
      projectLead: this.claimForm.value.projectLead,
      projectLeadExperience: this.claimForm.value.projectLeadExperience,
      uniqueProjectDevelopment: this.claimForm.value.uniqueProjectDevelopment,
      projectProblems: this.claimForm.value.projectProblems,
      projectProblemsDifficulty: this.claimForm.value.projectProblemsDifficulty,
      projectProblemsSolved: this.claimForm.value.projectProblemsSolved,
      projectTesting: this.claimForm.value.projectTesting,
      softwareAdvance: this.claimForm.value.softwareAdvance,
      stateAid: this.claimForm.value.stateAid
    })
      // tslint:disable-next-line:only-arrow-functions typedef
      .then(function()
      {
        console.log('Document successfully written!');
      })
      // tslint:disable-next-line:only-arrow-functions typedef
      .catch(function(error)
      {
        console.error('Error writing document: ', error);
      });
  }

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

  // TODO try this.claimForm.setValue instead
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

  async projectDurationRadioAnswered(): Promise<void>
  {
    await this.delay(100);

    if (this.claimForm.value.projectDurationRadio === '')
    {
      this.projectDurationShowDatePicker = false;
    }

    if (this.claimForm.value.projectDurationRadio === 'no')
    {
      this.projectDurationShowDatePicker = true;
    }

    if (this.claimForm.value.projectDurationRadio === 'yes')
    {
      this.projectDurationShowDatePicker = false;
    }
  }

  async delay(ms: number): Promise<void>
  {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  // submitForm(): any
  // {
  //   console.log(this.claimForm.value);
  // }

  submitForm(): any
  {
    console.log(this.claimForm.value);
    this.dataService.formData(this.claimForm);

    this.router.navigate(['../testPDF'], {relativeTo: this.route});
  }
}
