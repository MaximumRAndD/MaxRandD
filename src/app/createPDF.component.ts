import {Component, ElementRef, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

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

  // @ViewChild('htmlData') htmlData: ElementRef;

  // USERS = [
  //   {
  //     id: 1,
  //     name: 'Leanne Graham',
  //     email: 'sincere@april.biz',
  //     phone: '1-770-736-8031 x56442'
  //   },
  //   {
  //     id: 2,
  //     name: 'Ervin Howell',
  //     email: 'shanna@melissa.tv',
  //     phone: '010-692-6593 x09125'
  //   },
  //   {
  //     id: 3,
  //     name: 'Clementine Bauch',
  //     email: 'nathan@yesenia.net',
  //     phone: '1-463-123-4447',
  //   },
  //   {
  //     id: 4,
  //     name: 'Patricia Lebsack',
  //     email: 'julianne@kory.org',
  //     phone: '493-170-9623 x156'
  //   },
  //   {
  //     id: 5,
  //     name: 'Chelsey Dietrich',
  //     email: 'lucio@annie.ca',
  //     phone: '(254)954-1289'
  //   },
  //   {
  //     id: 6,
  //     name: 'Mrs. Dennis',
  //     email: 'karley@jasper.info',
  //     phone: '1-477-935-8478 x6430'
  //   }
  // ];
  //
  // downloadPDFnew()
  // {
  //   let node = document.getElementById('MyDIv');
  //
  //   let img;
  //   let filename;
  //   let newImage;
  //
  //   domtoimage.toPng(node, { bgcolor: '#fff' })
  //     // tslint:disable-next-line:only-arrow-functions typedef
  //     .then(function(dataUrl) {
  //
  //       img = new Image();
  //       img.src = dataUrl;
  //       newImage = img.src;
  //
  //       // tslint:disable-next-line:only-arrow-functions
  //       img.onload = function(){
  //
  //         let pdfWidth = img.width;
  //         let pdfHeight = img.height;
  //
  //         // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
  //
  //         let doc;
  //
  //         // if (pdfWidth > pdfHeight)
  //         // {
  //         //   doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
  //         // }
  //         // else
  //         // {
  //         doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
  //         // }
  //
  //         let width = doc.internal.pageSize.getWidth();
  //         let height = doc.internal.pageSize.getHeight();
  //
  //         doc.addImage(newImage, 'PNG',  10, 10, width, height);
  //         filename = 'mypdf_' + '.pdf';
  //         doc.save(filename);
  //       };
  //     })
  //     // tslint:disable-next-line:only-arrow-functions
  //     .catch(function(error) {
  //
  //       // Error Handling
  //
  //     });
  // }
  //
  // public captureScreen()
  // {
  //   const data = document.getElementById('MyDIv');
  //   html2canvas(data).then(canvas => {
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;
  //     const contentDataURL = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //     pdf.save('newtest.pdf');
  //   });
  // }
  //
  // generatePDF()
  // {
  //   let data = document.getElementById('MyDIv');
  //   html2canvas(data).then(canvas => {
  //     let imgWidth = 208;
  //     let imgHeight = canvas.height * imgWidth / canvas.width;
  //     const contentDataURL = canvas.toDataURL('image/png');
  //     let pdf = new jsPDF('p', 'mm', 'a4');
  //     var position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //     pdf.save('newPDF.pdf');
  //   });
  // }
  //
  // exportAsPDF()
  // {
  //   let data = document.getElementById('MyDIv');
  //   html2canvas(data).then(canvas =>
  //   {
  //     const contentDataURL = canvas.toDataURL('image/png');
  //     // let pdf = new jsPDF('l', 'cm', 'a4'); // Generates PDF in landscape mode
  //     let pdf = new jsPDF('p', 'cm', 'a4'); // Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
  //     pdf.output('dataurlnewwindow');
  //   });
  // }
  //
  // /*
  // * Version 2
  // * */
  // public openPDF():void
  // {
  //   let DATA = this.htmlData.nativeElement;
  //   let doc = new jsPDF('p', 'pt', 'a4');
  //   doc.fromHTML(DATA.innerHTML, 15, 15);
  //   doc.output('dataurlnewwindow');
  // }
  // //
  // // public downloadPDF():void
  // // {
  // //   let DATA = this.htmlData.nativeElement;
  // //   let doc = new jsPDF('p','pt', 'a4');
  // //
  // //   let handleElement =
  // //     {
  // //       // tslint:disable-next-line:typedef
  // //     '#editor'(element, renderer)
  // //     {
  // //       return true;
  // //     }
  // //   };
  // //   doc.fromHTML(DATA.innerHTML, 15, 15,
  // //     {
  // //     width: 200,
  // //     elementHandlers: handleElement
  // //   });
  // //
  // //   doc.save('angular-demo.pdf');
  // // }

  /*
  * Version 1
  * */
  reportEnabled = true;

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
