import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WebService } from './web.service';
import {claimDataLessThan, DurationDataLessThan, endDateMoreThanYear} from './validation/date.validation';
import { DataService } from './data.service';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import {ClaimFormHelpDialogComponent} from './dialogs/claim-form-help-dialog/claim-form-help-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'claimForm',
  templateUrl: './claimForm.component.html',
  styleUrls: ['./claimForm.component.css']
})

export class ClaimFormComponent implements OnInit
{

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              public dialog: MatDialog, private webService: WebService, private dataService: DataService,
              private db: DatabaseService, private authService: AuthService, private fsdb: AngularFirestore )
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
        // claimEndDate: [{value: '', disabled: true}, Validators.required] - try to use this in future instead of disable in HTML
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
        stateAid: ['', Validators.required],
        companiesHouseInput: ''
      },
      {
        validators: [claimDataLessThan('claimStartDate', 'claimEndDate'),
        endDateMoreThanYear('claimStartDate', 'claimEndDate'),
          DurationDataLessThan('projectStartDate', 'projectEndDate')]
      }
    );

    this.projectDurationShowDatePicker = false;
  }

  claimForm;
  claimFormValues;
  claimEndDateDisabled = true;
  ProjectEndDateDisabled = true;
  maxClaimDate: Date;
  maxProjectDate: Date;

  claimDateValid: boolean;

  addressArray;

  postCodeFound: boolean;
  postCodeSearched = false;
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

  ngOnInit(): any
  {
    console.log('ngOnInit called');
    if (this.authService.isLoggedIn)
    {
      console.log('ngOnInit is logged in');
      console.log(JSON.parse(localStorage.getItem('user')).uid);
      this.fsdb.collection('users').doc(JSON.parse(localStorage.getItem('user')).uid)
        .collection('claimForm').doc(this.route.snapshot.params.id).valueChanges().subscribe(value =>
      {
        this.claimFormValues = value;
        this.addEditValues();
      });
    }
    else
    {
      console.log('ngOnInit not logged in');
    }

    const id = this.route.snapshot.params.id;

    console.log(id);

  }

  addEditValues(): void
  {
    this.claimForm.patchValue
    ({
      name: this.claimFormValues.name,
      UTR: this.claimFormValues.UTR,
      compName: this.claimFormValues.compName,
      compAdr: this.claimFormValues.compAdr,
      claimStartDate: new Date(this.claimFormValues.claimStartDate.seconds * 1000),
      claimEndDate: new Date(this.claimFormValues.claimEndDate.seconds * 1000),
      addressLine1: this.claimFormValues.addressLine1,
      addressLine2: this.claimFormValues.addressLine2,
      addressLine3: this.claimFormValues.addressLine3,
      addressTown: this.claimFormValues.addressTown,
      addressCounty: this.claimFormValues.addressCounty,
      addressPostcode: this.claimFormValues.addressPostcode,
      projectSynopsis: this.claimFormValues.projectSynopsis,
      projectName: this.claimFormValues.projectName,
      projectDurationRadio: this.claimFormValues.projectDurationRadio,
      projectStartDate: new Date(this.claimFormValues.projectStartDate.seconds * 1000),
      projectEndDate: new Date(this.claimFormValues.projectEndDate.seconds * 1000),
      projectRAndDDescription: this.claimFormValues.projectRAndDDescription,
      projectResearch: this.claimFormValues.projectResearch,
      problemToSolve: this.claimFormValues.problemToSolve,
      projectLead: this.claimFormValues.projectLead,
      projectLeadExperience: this.claimFormValues.projectLeadExperience,
      uniqueProjectDevelopment: this.claimFormValues.uniqueProjectDevelopment,
      projectProblems: this.claimFormValues.projectProblems,
      projectProblemsDifficulty: this.claimFormValues.projectProblemsDifficulty,
      projectProblemsSolved: this.claimFormValues.projectProblemsSolved,
      projectTesting: this.claimFormValues.projectTesting,
      softwareAdvance: this.claimFormValues.softwareAdvance,
      stateAid: this.claimFormValues.stateAid
    });
  }

  saveFormToDB(): void
  {

    if (this.claimForm.value.projectDurationRadio === 'yes')
    {
      this.claimForm.value.projectStartDate = this.claimForm.value.claimStartDate;
      this.claimForm.value.projectEndDate = this.claimForm.value.claimEndDate;
    }

    this.checkUnRequiredValues();

    // TODO get return from write to find out if it worked
    this.db.writeClaimFormToDB(this.claimForm, JSON.parse(localStorage.getItem('user')).uid, this.route.snapshot.params.id);
  }

  checkUnRequiredValues(): void
  {
    if (this.claimForm.value.addressLine2 === undefined || '')
    {
      this.claimForm.value.addressLine2 = 'undefined_value';
    }
    if (this.claimForm.value.addressLine3 === undefined || '')
    {
      this.claimForm.value.addressLine3 = 'undefined_value';
    }
    if (this.claimForm.value.projectProblems === undefined || '')
    {
      this.claimForm.value.projectProblems = 'undefined_value';
    }
    if (this.claimForm.value.projectProblemsDifficulty === undefined || '')
    {
      this.claimForm.value.projectProblemsDifficulty = 'undefined_value';
    }
    if (this.claimForm.value.projectProblemsSolved === undefined || '')
    {
      this.claimForm.value.projectProblemsSolved = 'undefined_value';
    }
  }

  isInvalid(control): any
  {
    return this.claimForm.controls[control].invalid &&
      this.claimForm.controls[control].touched;
  }

  isUntouched(): any
  {
    return this.claimForm.controls.name.pristine ||
      this.claimForm.controls.compName.pristine ||
      this.claimForm.controls.UTR.pristine ||
      this.claimForm.controls.claimStartDate.pristine ||
      this.claimForm.controls.claimEndDate.pristine ||
      this.claimForm.controls.addressLine1.pristine ||
      this.claimForm.controls.addressTown.pristine ||
      this.claimForm.controls.addressCounty.pristine ||
      this.claimForm.controls.addressPostcode.pristine ||
      this.claimForm.controls.projectSynopsis.pristine ||
      this.claimForm.controls.projectName.pristine ||
      this.claimForm.controls.projectDurationRadio.pristine ||
      this.claimForm.controls.projectRAndDDescription.pristine ||
      this.claimForm.controls.projectResearch.pristine ||
      this.claimForm.controls.problemToSolve.pristine ||
      this.claimForm.controls.projectLead.pristine ||
      this.claimForm.controls.projectLeadExperience.pristine ||
      this.claimForm.controls.uniqueProjectDevelopment.pristine ||
      this.claimForm.controls.projectTesting.pristine ||
      this.claimForm.controls.softwareAdvance.pristine ||
      this.claimForm.controls.stateAid.pristine;
  }

  isEmpty(control): any
  {
    return this.claimForm.value[control] === '';
  }

  isRequiredFormEmpty(): any
  {
    return this.isEmpty('name') ||
      this.isEmpty('compName') ||
      this.isEmpty('UTR') ||
      this.isEmpty('claimStartDate') ||
      this.isEmpty('claimEndDate') ||
      this.isEmpty('addressLine1') ||
      this.isEmpty('addressTown') ||
      this.isEmpty('addressCounty') ||
      this.isEmpty('addressPostcode') ||
      this.isEmpty('projectSynopsis') ||
      this.isEmpty('projectName') ||
      this.isEmpty('projectDurationRadio') ||
      // this.isEmpty('projectStartDate') ||
      // this.isEmpty('projectEndDate') ||
      this.isEmpty('projectRAndDDescription') ||
      this.isEmpty('projectResearch') ||
      this.isEmpty('problemToSolve') ||
      this.isEmpty('projectLead') ||
      this.isEmpty('projectLeadExperience') ||
      this.isEmpty('uniqueProjectDevelopment') ||
      this.isEmpty('projectTesting') ||
      this.isEmpty('softwareAdvance') ||
      this.isEmpty('stateAid');
  }

  // TODO check this: https://stackoverflow.com/questions/40793427/angular-2-form-is-invalid-when-browser-autofill
  isIncomplete(): any
  {
    return this.isInvalid('name') ||
      this.isInvalid('compName') ||
      this.isInvalid('UTR') ||
      this.isInvalid('claimStartDate') ||
      this.isInvalid('claimEndDate') ||
      this.isInvalid('addressLine1') ||
      this.isInvalid('addressTown') ||
      this.isInvalid('addressCounty') ||
      this.isInvalid('addressPostcode') ||
      this.isInvalid('projectSynopsis') ||
      this.isInvalid('projectName') ||
      this.isInvalid('projectDurationRadio') ||
      this.isInvalid('projectRAndDDescription') ||
      this.isInvalid('projectResearch') ||
      this.isInvalid('problemToSolve') ||
      this.isInvalid('projectLead') ||
      this.isInvalid('projectLeadExperience') ||
      this.isInvalid('uniqueProjectDevelopment') ||
      this.isInvalid('projectTesting') ||
      this.isInvalid('softwareAdvance') ||
      this.isInvalid('stateAid') ||
      this.isRequiredFormEmpty();
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

  async onPostcodeSearch(): Promise<void>
   {
     this.postCodeSearched = true;
     this.postCodeFound = false;

     const response = await this.webService.getAddresses(this.claimForm.value.addressPostcode);

     // this.webService.getAddresses(this.claimForm.value.addressPostcode);

     console.log('response = ');
     console.log(this.webService.response);


     if (response.Message !== undefined)
     {
       this.postCodeFound = false;
       console.log('Error | ' + response.Message);
       console.log('postcodeFound = false');
     }
     else
     {
       this.addressArray = response.addresses;
       this.postCodeFound = true;
       console.log('postcodeFound = true');
     }
     console.log('postCodeFound = ' + this.postCodeFound + ' | postCodeSearched = ' + this.postCodeSearched);
   }

  findAddressArrayIndex(line1): void
  {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.addressArray.length; i++)
    {
      if (this.addressArray[i].line_1 === line1)
      {
        this.fillAddressInput(i);
      }
    }
  }

  fillAddressInput(index): void
  {
    console.log(this.addressArray);
    this.claimForm.patchValue
    ({
      addressLine1: this.addressArray[index].formatted_address[0],
      addressLine2: this.addressArray[index].formatted_address[1],
      addressLine3: this.addressArray[index].formatted_address[2],
      addressTown: this.addressArray[index].formatted_address[3],
      addressCounty: this.addressArray[index].formatted_address[4]
    });
  }

  async fillFormFromCH(): Promise<void>
  {
    const response = await this.webService.getCompanyInformation(this.claimForm.value.companiesHouseInput);

    this.claimForm.patchValue
    ({
      name: response.company_name,
      addressLine1: response.registered_office_address.address_line_1,
      addressLine2: response.registered_office_address.address_line_2,
      addressTown: response.registered_office_address.locality,
      addressCounty : response.registered_office_address.region,
      addressPostcode: response.registered_office_address.postal_code
    });
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

  openHelpDialog(control): void
  {
    this.dialog.open(ClaimFormHelpDialogComponent,
      {
        data:
          {
            question: control
          }
      });
  }

  async delay(ms: number): Promise<void>
  {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  test(): any
  {
    this.addEditValues();
  }

  submitForm(): any
  {
    console.log(this.claimForm.value);
    // this.dataService.formData(this.claimForm);

    if (this.authService.isLoggedIn)
    {
      // console.log(this.authService.userData.uid);
      this.saveFormToDB();
    }
    else
    {
      console.log('value is null');
    }
  }
}
