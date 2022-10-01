import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss'],
})
export class ExternalLinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  externalLink=[
    {url:"https://sparsh.defencepension.gov.in",name:"SPARSH"},
    {url:"https://echs.gov.in/",name:"ECHS"},
    {url:"https://www.indianarmyveterans.gov.in/",name:"DIAV"},
    {url:"https://indianarmy.nic.in/",name:"Indian Army"},
    {url:"https://pcdapension.nic.in/pcda/index.php",name:"PCDA(Pension)"},
    {url:"https://pcdaopune.gov.in/",name:"PCDA(Officers)"},
    {url:"https://cgda.nic.in/",name:"CGDA"},
    {url:"https://csdindia.gov.in/",name:"Canteen Store Department"},
    {url:"https://ksb.gov.in/",name:"KSB"},
    {url:"https://pgportal.gov.in/",name:"CPGRAM"},
    {url:"http://sainiksamachar.nic.in/",name:"Sainik Samachar"},
    {url:"https://www.mod.gov.in/",name:"Min of Defence"},
    {url:"https://www.desw.gov.in/",name:"Dept of ESW"},
    {url:"https://www.pensionseva.sbi/",name:"SBI Pension Seva"},
  ]
}
