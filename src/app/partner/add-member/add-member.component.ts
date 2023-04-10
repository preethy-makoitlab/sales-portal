import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Status } from 'src/app/stores/types';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

  addMemberForm!: FormGroup;
  viewForm: boolean = false;
  showDisable: boolean = false;
  isDisabled: boolean = false;
  editMode: boolean = false;
  isAlert: boolean = false;
  alertHeaderDisable: string = "Member Disable"
  alertBodyDisable: string = "Please make sure that you want to disable the member"
  alertHeaderEnable: string = "Member Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the member"

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private memberService: MemberService) {
      this.addMemberForm = this.formBuilder.group({
        membername: ['', Validators.required],
        membercode: ['', Validators.required],
        email: ['', Validators.required]
      });
  }

  member: any = {
    partnerId: "",
    name: "",
    email: "",
    memberId: "",
    department: "",
    branch: ""
  }

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  disableMember() {
    let req = {
       'status' : Status.Inactive
    };
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.memberService.updateMember(_id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/partner/managemember/'+this.member.partnerId]);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }

  enableMember() {
    let req = {
       'status' : Status.Active
    };
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.memberService.updateMember(_id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/partner/managemember/'+this.member.partnerId]);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = false;
  }

  submit(form: any) {
    console.log(form.value);
    console.log(this.member);
    let req = this.member;
    if(this.editMode) {
      let _id = String(this.activatedRoute.snapshot.params['id']);
      this.memberService.updateMember(_id, req).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/partner/managemember/'+this.member.partnerId]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.memberService.createMember(req).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/partner/managemember/'+this.member.partnerId]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  populate(_id: string) {
    this.memberService.getMember(_id).subscribe({
      next: (value) => {
        console.log(value);
        this.viewForm = true;
        this.showDisable = true;
        this.member = value;
        if(value.status == Status.Inactive) {
          this.isDisabled = true;
        }
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
       this.member.partnerId = value;
       this.populate(value);
      }
    }
  }
  
}
