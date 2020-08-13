import {Component, ElementRef, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';



@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'createPDF',
  templateUrl: './createPDF.component.html',
  styleUrls: ['./createPDF.component.css']
})

export class CreatePDFComponent
{
  @ViewChild('content') content: ElementRef;

  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  // claimForm: Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>;

  reportEnabled = true;

  constructor(private db: AngularFirestore)
  {
    this.item = this.db.collection('claimForm').doc('testUser1').valueChanges();
    console.log(this.item);
  }

  // readFireStore(): void
  // {
  //   const docRef = this.db.collection('claimForm').doc('testUser1');
  //
  //   // tslint:disable-next-line:only-arrow-functions typedef
  //   docRef.get().then(function(doc)
  //   {
  //     if (doc.exists)
  //     {
  //       console.log('Document data:', doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log('No such document!');
  //     }
  //     // tslint:disable-next-line:only-arrow-functions typedef
  //   }).catch(function(error)
  //   {
  //     console.log('Error getting document:', error);
  //   });
  // }

  testLog(): void
  {
    // console.log(this.claimForm);
  }

  createPDF(): any
  {
    const doc = new jsPDF();

    const specialElementHandlers =
      {
        // tslint:disable-next-line:typedef
        '#editor'(element, renderer)
        {
          return true;
        }
      };

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15,
      {
        width: 190,
        elementHandlers: specialElementHandlers
      });

    doc.save('test.pdf');
  }
}
