import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class DatabaseService
{
  constructor(private db: AngularFirestore, public router: Router, public ngZone: NgZone)
  { }


  // TODO if write fails do not change page
  // @ts-ignore
  writeClaimFormToDB(claimForm, uid): void
  {
    this.db.collection('users').doc(uid).collection('claimForm').doc('form').set
    ({
      name: claimForm.value.name,
      compName: claimForm.value.compName,
      UTR: claimForm.value.UTR,
      compAdr: claimForm.value.compAdr,
      claimStartDate: claimForm.value.claimStartDate,
      claimEndDate: claimForm.value.claimEndDate,
      addressLine1: claimForm.value.addressLine1,
      addressLine2: claimForm.value.addressLine2,
      addressLine3: claimForm.value.addressLine3,
      addressTown: claimForm.value.addressTown,
      addressCounty: claimForm.value.addressCounty,
      addressPostcode: claimForm.value.addressPostcode,
      projectSynopsis: claimForm.value.projectSynopsis,
      projectName: claimForm.value.projectName,
      projectDurationRadio: claimForm.value.projectDurationRadio,
      projectStartDate: claimForm.value.projectStartDate,
      projectEndDate: claimForm.value.projectEndDate,
      projectRAndDDescription: claimForm.value.projectRAndDDescription,
      projectResearch: claimForm.value.projectResearch,
      problemToSolve: claimForm.value.problemToSolve,
      projectLead: claimForm.value.projectLead,
      projectLeadExperience: claimForm.value.projectLeadExperience,
      uniqueProjectDevelopment: claimForm.value.uniqueProjectDevelopment,
      projectProblems: claimForm.value.projectProblems,
      projectProblemsDifficulty: claimForm.value.projectProblemsDifficulty,
      projectProblemsSolved: claimForm.value.projectProblemsSolved,
      projectTesting: claimForm.value.projectTesting,
      softwareAdvance: claimForm.value.softwareAdvance,
      stateAid: claimForm.value.stateAid
    })
      // tslint:disable-next-line:only-arrow-functions typedef
      .then(function()
      // TODO GOOGLE => angular how to run method inside .then function
      {
        console.log('Document successfully written!');
      })
      // tslint:disable-next-line:only-arrow-functions typedef
      .catch(function(error)
      {
        console.error('Error writing document: ', error);
        window.alert('Error writing document to database');
      });
    this.navigateToPDFPage();
  }

  navigateToPDFPage(): void
  {
    this.router.navigate(['../testPDF']);
  }
}
