import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatepickerModule, DatepickerOptions } from 'ng2-datepicker';
import { dateToddMMYYYY } from 'src/app/common/utils/utils';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  gotonext: boolean = false;
  addCompanyForm!: FormGroup;
  steppertitle1: string = "Partner Information";
  steppertitle2: string = "Subsription";
  partnerId: string = "";
  endDate!: Date;
  partnerSector: any[] = [];
  noOfSubscriptions: any[] = []

  constructor(private router: Router,
    private partnerService: PartnerService,
    private masterdataService : MasterdataService,
    private formBuilder: FormBuilder) {
      this.addCompanyForm = this.formBuilder.group({
        companyname: ['', Validators.required],
        companybranch: ['', Validators.required],
        partnertype: ['', Validators.required],
        companysector: ['', Validators.required],
        weblink: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
      });
    }

  spoc: any = [
    {
      'name': '',
      'email': '',
      'mobile': '',
      isOperations: false
    }
  ]

  partner: any = {
    companyName: "",
    companyBranch: "",
    partnerType: "",
    companySector: "",
    websiteLink: "",
    address: "",
    city: "",
    state: "",
    year: "",
    totalStrength: 0,
    ownership: "",
    isListed: false,
    isProfitable: false,
    spocDetails: this.spoc,
    status: "active",
    // noOfSubscriptions: "",
    // noOfSessions: "",
    // planDuration: 0,
    // startDate: "",
    // endDate: ""
  }

  subscription: any = {
    partnerId: "",
    noOfSubscriptions: "",
    noOfSessions: 0,
    planDuration: 0,
    subscriptionStart: "",
    subscriptionEnd: ""
  }

  // date = new Date();
  options: DatepickerOptions = {
    inputClass: 'input small-text noborder',
    calendarClass: 'datepicker-default',
    format: 'dd/MM/yyyy',
    scrollBarColor: '#010001',
    placeholder: 'DD-MM-YYYY'
  };

  
  submit(form: any) {
    console.log(form.value);
    console.log(this.partner);
    let req = this.partner;
    this.partnerService.createPartner(req).subscribe({
      next: (value) => {
        console.log(value);
        this.partnerId = value.partnerId;
        console.log(this.partnerId)
        this.router.navigate(['/partner']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  submitAndSubscribe(form: any) {
    console.log(form.value);
    console.log(this.subscription);
    this.subscription.partnerId = this.partnerId;
    this.subscription.subscriptionEnd = this.endDate;
    let req = this.subscription;
    this.partnerService.createSubscription(req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/partner']);
      },
      error: (err) => {
        console.log(err);
      }
    })    
  }

  addSpoc() {
    let spocObject = {
      'name': '',
      'email': '',
      'mobile': '',
      isOperations: false
    }
    this.spoc.push(spocObject);
    console.log(this.spoc);
  }

  removeSpoc(index: number) {
    this.spoc.splice(index, 1)
    console.log(this.spoc);
  }

  next(form: any) {
    this.gotonext = true;
    this.submit(form);
  }

  previous() {
    this.gotonext = false;
  }

  setEndDate() {
    if(this.subscription.subscriptionStart) {
      var start = new Date(this.subscription.subscriptionStart);
      var end = new Date(start);
      end.setFullYear(start.getFullYear() + this.subscription.planDuration);
      this.endDate = end;
      this.subscription.subscriptionEnd = dateToddMMYYYY(end);
      console.log(start, end);
    }
  }

  loadMasterData() {
    this.masterdataService.masterDataList().subscribe({
      next: (masterdata) => {
        console.log(masterdata);
        masterdata.forEach((master: { category: string; masterData: any[]; }) => {
          if(master.category == 'PartnerSectors'){
            master.masterData.forEach(data => {
              if(data.status == 'active'){
                this.partnerSector.push(data.data);
              }
            })
          }

          if(master.category == 'NoOfSubscriptions'){
            master.masterData.forEach(data => {
              if(data.status == 'active'){
                this.noOfSubscriptions.push(data.data);
              }
            })
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.loadMasterData()
  }

}
