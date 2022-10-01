import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController} from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { AskMeListComponent } from '../ask-me-list/ask-me-list.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  //@Input() text: any;
  constructor(public renderer: Renderer2,
    private modalController: ModalController,private router:Router,private auth:AuthService) { 
     // console.log('UserId', params.get('userId'));
    }

  ngOnInit() {}
  text;
  async faqmoreClick(e){
    this.text=e;
        if(this.text=='1'){
          console.log('1')
        }else if(this.text=='2'){
          console.log('2')
        }
        else if(this.text=='3'){
         console.log('3')
       }
       else if(this.text=='4'){
         console.log('4')
       }
       else if(this.text=='5'){
         console.log('5')
       }
       else if(this.text=='6'){
         console.log('6')
       }
       else if(this.text=='7'){
         console.log('7')
       }
       else if(this.text=='8'){
         console.log('8')
       }
       else if(this.text=='9'){
         console.log('m9')
       }
       else{
         console.log("10")
       }
       console.log('support page click')
       this.auth.text=this.text
       //this.router.navigate(['/faqList'])
       const modal = await this.modalController.create({
         component: AskMeListComponent,
         componentProps: {
                    textVal:this.text  }
       });
       return await modal.present();
     
   }
 
 
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
}
