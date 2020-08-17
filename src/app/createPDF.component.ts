import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import { AngularFirestore } from '@angular/fire/firestore';

@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'createPDF',
  templateUrl: './createPDF.component.html',
  styleUrls: ['./createPDF.component.css']
})

export class CreatePDFComponent implements OnInit
{
  @ViewChild('content') content: ElementRef;

  reportEnabled = true;
  claimForm;

  constructor(private db: AngularFirestore)
  {
  }

  ngOnInit(): any
  {
    this.db.collection('claimForm').doc('testUser1').valueChanges().subscribe(value =>
    {
      this.claimForm = value;
    });
  }

  testLog(): void
  {
    console.log(this.claimForm);
  }

  // TODO have margin at top of each new PDF page
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
