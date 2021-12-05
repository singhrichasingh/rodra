import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {

  constructor() { }
   downloads=[
     {name:"2018.10.17- Concordance Table.pdf",link:"javascript:__doPostBack('ctl00$ContentPlaceHolder1$grvForms','Download$28')"},
     {name:"Action by Spouse on Demise of a Pensioner.pdf",link:""},
     {name:"AIR_TRAVEL_CONCESSION_TO_WAR_VETERAN_WIDOW_GALLANTARY_AWARDEES.pdf",link:""},
     {name:"APPLICATION_FOR_TRANSFER_OF_PDA.PDF",link:""},
     {name:"BATTLE_AND_PHYSICAL_CASUALTIES_DOCUMENTS_AND_FORMS_FOR_PROCESSING_ENTITLEMENT_ CLAIMS_FOR_OFFICER.pdf",link:""},
     {name:"Brochure_on_Terminal_Benefits_for_Officers(Revised_Dec_2018).pdf",link:""},
     {name:"CHANGE_OF_PERMT_HOME_ADD.pdf",link:""},
     {name:"CHANGE_OF_SPOUSE_NAME_IN_PPO.pdf",link:""},
     {name:"Check List of Various Subjects  by PCDA (P).pdf",link:""},
     {name:"COMPILATION OF DATA FOR GRANT OF EX-GRATIA AWARD TO ECOS_SSCOs WHO PARTICIPATED IN 1965 AND 1971 WARS.PDF",link:""},
     {name:"Definition_of_ESM.pdf",link:""},
     {name:"DEPENDENT_FAMILY_PENSION_TO_PARENTS.pdf",link:""},
     {name:"DETAILS OF PRE INDIPENDENCE OFFRS.PDF",link:""},
     {name:"DOCUS_REQD_ON_DEATH.pdf",link:""},
     {name:"EDUCATION_CONCESSION_TO_BC.pdf",link:""},
     {name:"ENDORSEMENT_OF_DOB_OF_SPOUSE_IN_PPO.pdf",link:""},
     {name:"ENDORSEMENT_OF_FAMILY_PENSION_ON_DEMISE_OF_OFFRS_AFTER_RETIREMENT.pdf",link:""},
     {name:"ENDORSEMENT_OF_NAME_OF_2ND_WIFE_IN_PPO.pdf",link:""},
     {name:"ENDORSEMENT_OF_WIFE_IN_RECORD_OF_SERVICE.pdf",link:""},
     {name:"Estate_of_deceased_offrs_IT_Return.pdf",link:""},
     {name:"FAMILY_PENSION_TO_DISABLED_CHILD.pdf",link:""},
     {name:"FAMILY_PENSION_TO_UNMARRIED_WIDOWED_DIVORCED_DAUGHTER.pdf",link:""},
     {name:"FORM FOR ISSUE OF 7 CPC E-PPO.pdf",link:""},
     {name:"IAVC_Appln.pdf",link:""},
     {name:"INCLUSION OF NAMES OF THE WIDOWED_DIVORCED_UNMARRIED DAUGHTER_PARENT_SIBLINGS IN PPO.PDF",link:""},
     {name:"Instrs-Loss_of_16_Kb_ECHS_Card_&amp;_Temporary_Slip.pdf",link:""},
     {name:"Instrs_for_ECHS_Regn-Old_Card_Holder.pdf",link:""},
     {name:"Instrs_for_ECHS_Regn_Death_in_Service.pdf",link:""},
     {name:"Instrs_for_ECHS_Regn_Future_Retirees.pdf",link:""},
     {name:"Jeevan Pramaan Digital Life Certificate for Pensioners.pdf",link:""},
     {name:"JOINT_NOTIFICATION_DURING_LIFE_TIME_OF_PENSIONER.pdf",link:""},
     {name:"LPC Cum Datasheet for revision of pension as per 7th CPC.pdf",link:""},
     {name:"PAY_REVISION_OF_SSC_OFFICERS_(OLD TERM OPTEES).PDF",link:""},
     {name:"REVISION OF PENSION AS PER 7TH CPC PRE 01 JAN 2019 RETIREE.pdf",link:""},
     {name:"REVISION_OF_PENSION_PRE_2006_RETIREES.pdf",link:""},
     {name:"SERVICE_PARTICULARS_BOOKLET.pdf",link:""}
    ]
  ngOnInit() {}

}
