import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WebService
{

  constructor(private http: HttpClient)
  {
  }

  // TODO make the API key a var
  getAddresses(postcode): any
  {
    // return this.http.get
    // (
    //    'https://api.getAddress.io/find/' + postcode + '?api-key=cKB4Ai3P_UeipP67DtRt4g27635&expand=true'
    // ).toPromise();

    const response = '{"postcode":"BT39 0UB","latitude":54.754812,"longitude":-6.048338,"addresses":[{"formatted_address":["1 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"1","line_1":"1 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["2 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"2","line_1":"2 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["3 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"3","line_1":"3 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["4 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"4","line_1":"4 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"},{"formatted_address":["5 Cogry Manor","","","Doagh, Ballyclare","County Antrim"],"thoroughfare":"Cogry Manor","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"5","line_1":"5 Cogry Manor","line_2":"","line_3":"","line_4":"","locality":"Doagh","town_or_city":"Ballyclare","county":"County Antrim","district":"Antrim And Newtownabbey","country":"Northern Ireland"}]}';
    const jsonObject = JSON.parse(response);
    return jsonObject;
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
