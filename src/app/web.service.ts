import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WebService
{

  constructor(private http: HttpClient)
  {
  }

  getAddresses(postcode): any
  {
    return this.http.get
    (
       'https://api.getAddress.io/find/' + postcode + '?api-key=cKB4Ai3P_UeipP67DtRt4g27635&expand=true'
      //'https://api.getAddress.io/find/BT390UB?api-key=cKB4Ai3P_UeipP67DtRt4g27635&expand=true'
    ).toPromise();
    console.log('Address API ran');
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
