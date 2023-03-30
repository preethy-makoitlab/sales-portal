import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatepickerModule, DatepickerOptions } from 'ng2-datepicker';
import { dateToddMMYYYY } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  gotonext: boolean = false;
  addCompanyForm!: FormGroup;
  steppertitle1: string = "Partner Information"
  steppertitle2: string = "Subsription"

  constructor(private router: Router,
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
    totalStrength: "",
    ownership: "",
    isListed: false,
    isProfitable: false,
    spocDetails: this.spoc,
    noOfSubscriptions: "",
    noOfSessions: "",
    planDuration: 0,
    startDate: "",
    endDate: ""
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
    console.log(this.addCompanyForm);
    // this.router.navigate(['/partner']);
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

  next() {
    this.gotonext = true;
  }

  previous() {
    this.gotonext = false;
  }

  setEndDate() {
    if(this.partner.startDate) {
      var start = new Date(this.partner.startDate);
      var end = new Date(start);
      end.setFullYear(start.getFullYear() + this.partner.planDuration);
      this.partner.endDate = dateToddMMYYYY(end);
      console.log(start, end);
    }
  }

}
