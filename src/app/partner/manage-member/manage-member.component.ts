import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyoTranslateService } from 'src/app/services/anyo-translate.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent {

  constructor(private translate: AnyoTranslateService,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService) {}
  
  totalCount: number = 0;
  activeCount: number = 0;
  partnerId!: string;
  fields: any[] = ['', 'Name', 'EmailID', 'Department Name', 'Branch', 'Last Active On']
  tableData: any[] = [];

  getCount() {
    this.memberService.memberCount(this.partnerId).subscribe({
      next: (value) => {
        console.log(value);
        this.totalCount = value.count;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  listMembers() {
    this.memberService.memberList(this.partnerId).subscribe({
      next: (value) => {
        console.log(value);
        value.forEach((d: { _id: any; name: any; email: any; department: any; branch: any; status: string; }) => {
          var memberData: any = {};
          var _id = d._id;
          var name = d.name;
          var email = d.email;
          var dept = d.department;
          var branch = d.branch;
          var lastActive = '03-04-2022'; 
          var data = [
            {
              data: null,
              isImage: true,
              imageFile: 'default-user.svg',
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: name,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: email,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: dept,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: branch,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: lastActive,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: null,
              isImage: true,
              imageFile: 'view-eye.svg',
              isButton: false,
              isEditable: false,
              isClickable: true,
              route: '',
              isCheckbox: false
            },
            {
              data: null,
              isImage: true,
              imageFile: 'delete-member.svg',
              isButton: false,
              isEditable: false,
              isClickable: true,
              route: '',
              isCheckbox: false
            },
            {
              data: null,
              isImage: false,
              isButton: true,
              buttonLabel: 'Resend Invite',
              buttonIcon: 'paper-plane.svg',
              route: '',
              isEditable: false,
              isClickable: true,
              isCheckbox: false
            }
          ]
          memberData.id = _id;
          memberData.data = data;
          memberData.isDisabled = d.status == 'inactive' ? true : false;
          this.tableData.push(memberData);
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
       this.partnerId = value;
      }
    }
    this.getCount();
    this.listMembers();
  }

}
