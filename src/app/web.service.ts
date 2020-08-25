import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WebService
{

  constructor(private http: HttpClient)
  {
  }

  getAddressAPIKey = 'cKB4Ai3P_UeipP67DtRt4g27635';
  companiesHouseAPIKey = '5q094ebNYXEFiwJowmKj44MoVf59nj4IyLc9pB4Z:';

  response;

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
    ).toPromise();


    // return this.http.get
    // (
    //    'https://api.getAddress.io/find/' + postcode + '?api-key=cKB4Ai3P_UeipP67DtRt4g27635&expand=true', {observe: 'response'}
    // ).subscribe(
    //   // data => console.log('success', data),
    //   // error => console.log('oops', error)
    //   response => console.log(response.status)
    //   // data => this.response = data,
    //   // error => this.response = error
    // );
    //
    // console.log(this.response);

      // .catch((err: HttpErrorResponse) => {
      // // simple logging, but you can do a lot more, see below
      // console.error('An error occurred:', err.error);

    // return this.http.get
    // (
    //   'https://api.getAddress.io/find/' + postcode + '?api-key=cKB4Ai3P_UeipP67DtRt4g27635&expand=true', {observe: 'response'}
    // ).subscribe(response =>
    // {
    //   console.log(response.status);
    // });

    // tslint:disable-next-line:max-line-length
    // const response = '{"postcode":"BT7 2JB","latitude":54.5905662,"longitude":-5.9233918,"addresses":[{"formatted_address":["A B Distribution Ltd","2 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"A B Distribution Ltd","sub_building_number":"","building_number":"2","line_1":"A B Distribution Ltd","line_2":"2 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Ammi Systems Ltd","10 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Ammi Systems Ltd","sub_building_number":"","building_number":"10","line_1":"Ammi Systems Ltd","line_2":"10 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Apex Housing","6 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Apex Housing","sub_building_number":"","building_number":"6","line_1":"Apex Housing","line_2":"6 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["British Medical Association","16 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"British Medical Association","sub_building_number":"","building_number":"16","line_1":"British Medical Association","line_2":"16 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["E Commission Ltd","4 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"E Commission Ltd","sub_building_number":"","building_number":"4","line_1":"E Commission Ltd","line_2":"4 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Goudsmit Uk","10 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Goudsmit Uk","sub_building_number":"","building_number":"10","line_1":"Goudsmit Uk","line_2":"10 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Halifax Direct","24 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Halifax Direct","sub_building_number":"","building_number":"24","line_1":"Halifax Direct","line_2":"24 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Hannawayca Ltd","12 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Hannawayca Ltd","sub_building_number":"","building_number":"12","line_1":"Hannawayca Ltd","line_2":"12 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Hca Business Recovery Ltd","12 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Hca Business Recovery Ltd","sub_building_number":"","building_number":"12","line_1":"Hca Business Recovery Ltd","line_2":"12 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Hca Corporate Finance Ltd","12 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Hca Corporate Finance Ltd","sub_building_number":"","building_number":"12","line_1":"Hca Corporate Finance Ltd","line_2":"12 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Information Commissioners Office","14 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Information Commissioners Office","sub_building_number":"","building_number":"14","line_1":"Information Commissioners Office","line_2":"14 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Isdm Solutions Ltd","10 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Isdm Solutions Ltd","sub_building_number":"","building_number":"10","line_1":"Isdm Solutions Ltd","line_2":"10 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Jcp Trust Ltd","8 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Jcp Trust Ltd","sub_building_number":"","building_number":"8","line_1":"Jcp Trust Ltd","line_2":"8 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Johnston Campbell Holdings Ltd","8 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Johnston Campbell Holdings Ltd","sub_building_number":"","building_number":"8","line_1":"Johnston Campbell Holdings Ltd","line_2":"8 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Johnston Campbell Ltd","8 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Johnston Campbell Ltd","sub_building_number":"","building_number":"8","line_1":"Johnston Campbell Ltd","line_2":"8 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Lloyds Tsb Foundation For Northern Ireland","14 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Lloyds Tsb Foundation For Northern Ireland","sub_building_number":"","building_number":"14","line_1":"Lloyds Tsb Foundation For Northern Ireland","line_2":"14 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Northern Ireland General Practitioners Defence Fund Ltd","16 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Northern Ireland General Practitioners Defence Fund Ltd","sub_building_number":"","building_number":"16","line_1":"Northern Ireland General Practitioners Defence Fund Ltd","line_2":"16 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["R & M Consultancy Ltd","14 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"R & M Consultancy Ltd","sub_building_number":"","building_number":"14","line_1":"R & M Consultancy Ltd","line_2":"14 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Radisson S A S Hotel","3 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Radisson S A S Hotel","sub_building_number":"","building_number":"3","line_1":"Radisson S A S Hotel","line_2":"3 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Royal College of G Ps","4 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Royal College of G Ps","sub_building_number":"","building_number":"4","line_1":"Royal College of G Ps","line_2":"4 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Sisk","10 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Sisk","sub_building_number":"","building_number":"10","line_1":"Sisk","line_2":"10 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["St. James\'s Place","14 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"St. James\'s Place","sub_building_number":"","building_number":"14","line_1":"St. James\'s Place","line_2":"14 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Sysco (N I) Ltd","4 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Sysco (N I) Ltd","sub_building_number":"","building_number":"4","line_1":"Sysco (N I) Ltd","line_2":"4 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["The Lighthouse","1 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"The Lighthouse","sub_building_number":"","building_number":"1","line_1":"The Lighthouse","line_2":"1 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["The Mace","10 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"The Mace","sub_building_number":"","building_number":"10","line_1":"The Mace","line_2":"10 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Version 1","12 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Version 1","sub_building_number":"1","building_number":"12","line_1":"Version 1","line_2":"12 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"},{"formatted_address":["Vision 1 Ltd","14 Cromac Place","","Belfast","County Antrim"],"thoroughfare":"Cromac Place","building_name":"","sub_building_name":"Vision 1 Ltd","sub_building_number":"","building_number":"14","line_1":"Vision 1 Ltd","line_2":"14 Cromac Place","line_3":"","line_4":"","locality":"","town_or_city":"Belfast","county":"County Antrim","district":"Belfast","country":"Northern Ireland"}]}'
    // tslint:disable-next-line:max-line-length
    // const response = '{"postcode":"BT39 0UB","latitude":54.754812,"longitude":-6.048338,"addresses":[{"formatted_address":["1 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"1","line_1":"1 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["2 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"2","line_1":"2 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["3 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"3","line_1":"3 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["4 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"4","line_1":"4 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["5 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"5","line_1":"5 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"}]}';
    // const response = '{"Message": "Bad Request: Invalid postcode."}';
    // const jsonObject = JSON.parse(response);
    // return jsonObject;
  }

  getCompanyInformation(compNum): any
  {
    const url = 'https://api.companieshouse.gov.uk/company/' + compNum;

    return this.http.get
    (
      url, {headers: {Authorization: 'Basic ' + btoa(this.companiesHouseAPIKey)}}
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
