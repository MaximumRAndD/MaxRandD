import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {Value} from '@angular/fire/remote-config';
import {firestore} from 'firebase';
import Firestore = firebase.firestore.Firestore;
import * as firebase from 'firebase';
import {FirebaseApp} from '@angular/fire';

interface Form
{
  name: string;
  compName: string;
  UTR: string;
  compAdr: string;
  claimStartDate: any;
  claimEndDate: any;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressTown: string;
  addressCounty: string;
  addressPostcode: string;
  projectSynopsis: string;
  projectName: string;
  projectDurationRadio: string;
  projectStartDate: string;
  projectEndDate: string;
  projectRAndDDescription: string;
  projectResearch: string;
  problemToSolve: string;
  projectLead: string;
  projectLeadExperience: string;
  uniqueProjectDevelopment: string;
  projectProblems: string;
  projectProblemsDifficulty: string;
  projectProblemsSolved: string;
  projectTesting: string;
  softwareAdvance: string;
  stateAid: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  templateUrl: 'test.component.html',
  styleUrls: ['app.component.css']
})
export class TestComponent implements OnInit
{
  nameTest: string;
  formDoc: AngularFirestoreDocument<Form>;
  form: Observable<Form>;

  testValue: any;

  items: Observable<any[]>;
  constructor(private db: AngularFirestore)
  {
    // this.items = firestore.collection('items').valueChanges();
  }










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

  // tslint:disable-next-line:typedef

  private testPrivateList;
  private testSubject = new Subject();
  testList = this.testSubject.asObservable();

  testArray;


  // Returns an obserbal that can be printed to log, need to assign the value to a var to work
  ngOnInit(): any
  {
    this.db.collection('claimForm').valueChanges().subscribe(value =>
    {
      // @ts-ignore
      console.log(value);
      this.testArray = value[0];
      // this.testPrivateList = value;
      // this.testSubject.next(this.testList);
    });
    console.log('JUST READ THE DB || ' + this.testArray);
  }
















  pleaseJustRead(): any
  {
    this.db.collection('claimForm').doc('testUser1')
      .valueChanges().subscribe(value => console.log(value));
  }




  testFormRead(): void
  {
    // this.formDoc = this.db.collection('claimForm').doc('testUser1');
    this.formDoc = this.db.doc('claimForm/testUser1');
    this.form = this.formDoc.valueChanges();
  }

  // tslint:disable-next-line:typedef
  update(form: Form)
  {
    this.formDoc.update(form);
  }

  readFireStore(): any
  {
    console.log(this.db.collection('claimForm').doc('testUser1').snapshotChanges());
    // return this.db.collection('claimForm').doc('testUser1').snapshotChanges();
  }

  testFireStoreRead(): void
  {
    this.items = this.db.collection('items').valueChanges();
    console.log(this.items);
  }

  testFireStoreAdd(): void
  {
    this.db.collection('test').doc('testDoc1').set
    ({
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
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

  testLog(): void
  {
    console.log(this.items);
  }
}
