import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatepickerModule, DatepickerOptions } from 'ng2-datepicker';
import { dateToddMMYYYY } from 'src/app/common/utils/utils';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { PartnerService } from 'src/app/services/partner.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { isoToDDMMYYYY } from 'src/app/common/utils/utils';
import { Status } from 'src/app/stores/types';

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
  subscriptionId: string = "";
  endDate!: Date;
  viewForm: boolean = false;
  isDisabled: boolean = false;
  editMode: boolean = false;
  isSubscription: boolean = false;
  isAlert: boolean = false;
  alertHeaderDisable: string = "Partner Disable"
  alertBodyDisable: string = "Please make sure that you want to disable the partner"
  alertHeaderEnable: string = "Partner Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the partner"
  partnerSector: any[] = [];
  noOfSubscriptions: any[] = []
  showDisable: boolean = false;

  constructor(private router: Router,
    private partnerService: PartnerService,
    private subscriptionService: SubscriptionService,
    private masterdataService : MasterdataService,
    private activatedRoute: ActivatedRoute,
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
    // status: "active",
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
    placeholder: 'DD-MM-YYYY',
  };

  
  submit(form: any) {
    console.log(form?.value);
    console.log(this.partner);
    let req = this.partner;
    if(this.editMode){
      let _id = String(this.activatedRoute.snapshot.params['id']);
      this.partnerService.updatePartner(_id, req).subscribe({
        next: (value) => {
          console.log(value);
          if(!this.gotonext){
            this.router.navigate(['/partner']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else{
      this.partnerService.createPartner(req).subscribe({
        next: (value) => {
          console.log(value);
          this.partnerId = value.partnerId;
          console.log(this.partnerId)
          if(!this.gotonext){
            this.router.navigate(['/partner']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  submitAndSubscribe(form: any) {
    console.log(form.value);
    console.log(this.subscription);
    this.subscription.partnerId = this.partnerId;
    this.subscription.subscriptionEnd = this.endDate;
    let req = this.subscription;
    if(this.editMode){
      this.subscriptionService.updateSubscription(this.subscriptionId, req).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/partner']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.subscriptionService.createSubscription(req).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/partner']);
        },
        error: (err) => {
          console.log(err);
        }
      })    
    }
  }

  redirect(link: string) {
    window.open('http://'+link, '_blank');
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

  editForm() {
    this.viewForm = false;
    this.editMode = true;
  }

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  disablePartner() {
    let req = {
       'status' : Status.Inactive
    };
    this.partner.status = Status.Inactive;
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.partnerService.updatePartner(_id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/partner']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }

  enablePartner() {
    let req = {
       'status' : Status.Active
    };
    this.partner.status = Status.Active;
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.partnerService.updatePartner(_id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/partner']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = false;
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

  fetchSubscription() {
    this.gotonext = true; 
    this.submit(null);
    this.subscriptionService.getSubscription(this.partnerId).subscribe({
      next: (value) => {
        console.log(value);
        this.subscription = value;
        this.subscriptionId = value.id;
        this.subscription.subscriptionStart = new Date(value.subscriptionStart);
        this.subscription.subscriptionEnd = isoToDDMMYYYY(value.subscriptionEnd);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  populate(_id: string) {
    this.partnerService.getPartner(_id).subscribe({
      next: (value) => {
        console.log(value);
        this.viewForm = true;
        this.showDisable = true;
        this.partner = value;
        this.spoc = value.spocDetails;
        this.partnerId = value.partnerId;
        if(value.status == Status.Inactive) {
          this.isDisabled = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadMasterData() {
    this.masterdataService.masterDataList().subscribe({
      next: (masterdata) => {
        console.log(masterdata);
        masterdata.forEach((master: { category: string; masterData: any[]; }) => {
          if(master.category == 'PartnerSectors'){
            master.masterData.forEach(data => {
              if(data.status == Status.Active){
                this.partnerSector.push(data.data);
              }
            })
          }

          if(master.category == 'NoOfSubscriptions'){
            master.masterData.forEach(data => {
              if(data.status == Status.Active){
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

    if(this.activatedRoute.snapshot.params){
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if(value){
       this.populate(value)
      }
    }

    this.loadMasterData()
  }

}
