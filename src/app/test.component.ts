import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  templateUrl: 'test.component.html',
  styleUrls: ['app.component.css']
})
export class TestComponent implements OnInit
{

  constructor(private db: AngularFirestore)
  {
  }

  testArray;
  test;

  ngOnInit(): any
  {
    this.db.collection('claimForm').doc('testUser1').valueChanges().subscribe(value =>
    {
      // @ts-ignore
      // console.log(value);
      this.testArray = value;
    });
    console.log(this.testArray);
  }

  pleaseJustRead(): any
  {

    this.db.collection('claimForm').doc('testUser1').valueChanges().subscribe( value =>
    {
      // console.log(value);
      this.test = value;

      console.log('read the below');
      console.log(this.test);
      console.log('read the above');
      console.log(this.test.name);
    });
    // console.log('read the below');
    // console.log(this.testArray);
    // console.log(this.testArray.name);
    // console.log('read the above');
  }

}
