/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/auth.service';
import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lpcinvoice',
  templateUrl: './lpcinvoice.component.html',
  styleUrls: ['./lpcinvoice.component.scss'],
})
export class LpcinvoiceComponent implements OnInit {
  @Input() editData;
  content: string;
  @ViewChild('PrintInvoice') PrintInvoice: ElementRef;
  invoiceDetail;
  constructor(private pdfGenerator: PDFGenerator, private modalCtrl: ModalController,
    private router: Router,private auth: AuthService) {
      console.log('rec here invoice',);
     }

  ngOnInit() { }

  downloadInvoice() {
    this.content=this.PrintInvoice.nativeElement.innerHTML;
    //this.content = document.getElementById('PrintInvoice').innerHTML;
    const options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Order-Invoice.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });
}

  dismiss() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/openlpc'])
  }
}
