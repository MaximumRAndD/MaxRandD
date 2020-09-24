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
  test = false;
  fullAddress;
  todayDate = Date.now();

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
    }
  }

  async ngOnInit(): Promise<any>
  {
    if (this.authService.isLoggedIn)
    {
      const user = await this.authService.getCurrentUserUid();
      const userUid = user.uid;

      this.db.collection('users').doc(userUid).collection('claimForm')
        .doc(this.route.snapshot.params.id).valueChanges().subscribe(value =>
      {
        this.claimForm = value;
        this.createAddress();
      });
    }
    else
    {
      console.log('ngOnInit not logged in');
    }
  }

  createAddress(): void
  {
    if (this.claimForm.addressLine2 === 'undefined_value')
    {
      this.address2Used = true;
    }
    if (this.claimForm.addressLine3 === 'undefined_value')
    {
      this.address3Used = true;
    }

    if (this.address2Used === true && this.address3Used === true)
    {
      this.fullAddress = this.claimForm.addressLine1 + ', ' + this.claimForm.addressLine2 + ', ' + this.claimForm.address3Used + ', ' +
        this.claimForm.addressTown + ', ' + this.claimForm.addressCounty + ', ' + this.claimForm.addressPostcode;
    }
    else if (this.address2Used === true && this.address3Used === false)
    {
      this.fullAddress = this.claimForm.addressLine1 + ', ' + this.claimForm.addressLine2 + ', ' + this.claimForm.addressTown +
        ', ' + this.claimForm.addressCounty + ', ' + this.claimForm.addressPostcode;
    }
    else if (this.address2Used === false && this.address3Used === true)
    {
      this.fullAddress = this.claimForm.addressLine1 + ', ' + this.claimForm.addressLine3 + ', ' + this.claimForm.addressTown +
        ', ' + this.claimForm.addressCounty + ', ' + this.claimForm.addressPostcode;
    }
    else if (this.address2Used === false && this.address3Used === false)
    {
      this.fullAddress = this.claimForm.addressLine1 + ', ' + this.claimForm.addressTown +
        ', ' + this.claimForm.addressCounty + ', ' + this.claimForm.addressPostcode;
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

  }

  createPDF(): any
  {
    let doc = new jsPDF();

    const specialElementHandlers =
      {
        // tslint:disable-next-line:typedef
        '#editor'(element, renderer)
        {
          return true;
        }
      };

    const margins =
      {
      top: 20,
      bottom: 20,
      left: 15,
      right: 15,
      width: 180
    };

    const content = this.content.nativeElement;

    // doc.fromHTML(content.innerHTML, 15, 15,
    //   {
    //     width: 180,
    //     elementHandlers: specialElementHandlers
    //   },
    //   // tslint:disable-next-line:only-arrow-functions typedef
    //   function(dispose)
    //   {
    //     doc.save('test.pdf');
    //   }, margins);

    doc.fromHTML(content.innerHTML, 15, 15,
      {
        width: 180,
        elementHandlers: specialElementHandlers
      },
      // tslint:disable-next-line:only-arrow-functions typedef
      dispose =>
      {
        doc = this.addWaterMark(doc);
        doc.save('testPDF.pdf');
      }, margins);

    // doc = this.addWaterMark(doc);
  }

  addWaterMark(doc): any
  {
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 0; i < totalPages; i++)
    {
      doc.setPage(i);

      doc.setTextColor(150);
      doc.setFontSize(10);

      // This starts on the last page before jumping to first, this if will ensure correct page numbers
      // may be caused by page 0 not existing?
      if (i === 0)
      {
        doc.text(15, doc.internal.pageSize.height - 10, 'Page ' + totalPages);
      }
      else
      {
        doc.text(15, doc.internal.pageSize.height - 10, 'Page ' + i);
      }

      doc.text(150, doc.internal.pageSize.height - 10, 'Powered by MaximumR&D');

      const logoImg = new Image();
      logoImg.src = 'assets/img/Placeholder_logo_TEMPORARY.png';
      // doc.addImage(logoImg, 'PNG', 10, 0, 67.5, 14.5);
      doc.addImage(logoImg, 'PNG', 10, 5, 51.9, 11.2);

      // const img = new Image();
      // img.src = 'assets/img/test.png';
      // doc.addImage(img, 'PNG', 40, 40, 75, 75);


    }
    return doc;
  }
}
