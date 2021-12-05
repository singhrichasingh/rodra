import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  data=[
    {
      id:1,
    text:'RODRA Website'
    },
    {
      id:2,
    text:'Pension'
    },
    {
      id:3,
    text:'AGI Extended Insurance Scheme'
    },
    {
      id:4,
    text:'Documentation after Retirement'
    },
    {
      id:5,
    text:'Actions on Demise of Pensioner/Family Pensioner'
    },
    {
      id:6,
    text:'Indian Army Veteran Card (IAVC)'
    },
    {
      id:7,
    text:'Army Officers Benevolent Fund (AOBF)'
    },
    {
      id:8,
    text:'Entitlements on Death (while in service & in harness)'
    },
    {
      id:9,
    text:'Welfare Schemes of KSB'
    },
    {
      id:10,
    text:'Ex-Servicemen Contributory Health Scheme (ECHS)'
    }
  ]
  constructor() { }

  ngOnInit() {}

}
