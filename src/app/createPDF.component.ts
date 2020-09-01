import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import {ActivatedRoute} from '@angular/router';

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

  // Booleans for showing if an UnRequired value is used
  address2Used = false;
  address3Used = false;
  projectProblemsUsed = false;
  projectProblemsDifficultyUsed = false;
  projectProblemsSolvedUsed = false;

  constructor(private db: AngularFirestore, private authService: AuthService, private route: ActivatedRoute)
  {
    if (this.authService.isLoggedIn)
    {
      console.log('logged in');
    }
  }

  ngOnInit(): any
  {
    console.log('ngOnInit called');
    if (this.authService.isLoggedIn)
    {
      console.log('ngOnInit is logged in');
      console.log(JSON.parse(localStorage.getItem('user')).uid);
      this.db.collection('users').doc(JSON.parse(localStorage.getItem('user')).uid)
        .collection('claimForm').doc(this.route.snapshot.params.id).valueChanges().subscribe(value =>
      {
        this.claimForm = value;
      });
    }
    else
    {
      console.log('ngOnInit not logged in');
    }
  }

  checkUnRequiredValues(): void
  {
    if (this.claimForm.addressLine2 === 'undefined_value')
    {
      this.address2Used = true;
    }
    if (this.claimForm.addressLine3 === 'undefined_value')
    {
      this.address3Used = true;
    }
    if (this.claimForm.projectProblems === 'undefined_value')
    {
      this.projectProblemsUsed = true;
    }
    if (this.claimForm.projectProblemsDifficulty === 'undefined_value')
    {
      this.projectProblemsDifficultyUsed = true;
    }
    if (this.claimForm.projectProblemsSolved === 'undefined_value')
    {
      this.projectProblemsSolvedUsed = true;
    }
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
