import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService
{

  constructor(private http: HttpClient)
  {
  }

  getAddressAPIKey = 'cKB4Ai3P_UeipP67DtRt4g27635';
  companiesHouseAPIKey = '5q094ebNYXEFiwJowmKj44MoVf59nj4IyLc9pB4Z:';

  response;

  error(): any
  {
    console.log('error');
  }

  // TODO get the API to read and accept errors
  getAddresses(postcode): any
  {
    // For testing
    if (postcode === '')
    {
      postcode = 'XX2 00X';
    }

    return this.http.get
    (
      'https://api.getAddress.io/find/' + postcode + '?api-key=cKB4Ai3P_UeipP67DtRt4g27635&expand=true'
    );
  }

  getCompanyInformation(compNum): any
  {
    // For testing
    if (compNum === '')
    {
      compNum = '05588682';
    }

    const url = 'https://api.companieshouse.gov.uk/company/' + compNum;

    return this.http.get
    (
      url, {headers: {Authorization: 'Basic ' + btoa(this.companiesHouseAPIKey)}}
    );
  }

  getStripeSessionKeyPassInUID(userID): any
  {
    console.log('called');

    // URLs
    const url = 'https://europe-west2-maximumrandd-49bd0.cloudfunctions.net/app/create-checkout-session';
    const testUrl = 'http://localhost:5001/maximumrandd-49bd0/europe-west2/app/create-checkout-session';

    const body = {user: userID};

    return this.http.post
    (
      url, body
    ).toPromise();
  }

  /*
      Better more secure way, but cant get working
   */
  // private addressPrivateList;
  // private addressesSubject = new Subject();
  // addressList = this.addressesSubject.asObservable();
  //
  // getAddresses(postcode): any
  // {
  //   console.log('getAddresses ran');
  //   return this.http.get
  //   (
  //     'https://api.getAddress.io/find/BT390UB?api-key=cKB4Ai3P_UeipP67DtRt4g27635'
  //   ).subscribe(response =>
  //   {
  //     // @ts-ignore
  //     this.addressPrivateList = response;
  //     this.addressesSubject.next(this.addressPrivateList);
  //   });
  //
  //   console.log(this.addressList + 'test');
  // }
}
