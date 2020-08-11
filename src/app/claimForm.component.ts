import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
        projectSynopsis: ['', Validators.required]
      }
    );
  }

  claimForm;
  claimEndDateDisabled = true;
  maxClaimDate;

  testArray;

  addressLine1;
  addressLine2;
  addressLine3;
  addressTown;
  addressCounty;
  projectSynopsisTemplate;

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

  // async onPostcodeSearch(): Promise<void>
  // {
  // tslint:disable-next-line:max-line-length
  //   const response = '{"postcode":"BT39 0UB","latitude":54.754812,"longitude":-6.048338,"addresses":[{"formatted_address":["1 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"1","line_1":"1 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["2 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"2","line_1":"2 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["3 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"3","line_1":"3 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["4 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"4","line_1":"4 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["5 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"5","line_1":"5 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"}]}';
  //
  //   const jsonObject = JSON.parse(response);
  //   this.testArray = jsonObject.addresses;
  //
  //   console.log(this.testArray[1]);
  // }


  // TODO error handling
   async onPostcodeSearch(): Promise<void>
   {
     console.log('onPostcodeSearch ran');
     const response = await this.webService.getAddresses(this.claimForm.value.addressPostcode);
     console.log(response);

     this.testArray = response.addresses;

     console.log(this.testArray[1]);
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

  submitForm(): any
  {
    console.log(this.claimForm.value);
  }
}
