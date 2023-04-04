import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

  addMemberForm!: FormGroup;

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

  submit(form: any) {
    console.log(form.value);
    console.log(this.member);
    let req = this.member;
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
  

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params){
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if(value){
       this.member.partnerId = value;
      }
    }
  }
  
}
