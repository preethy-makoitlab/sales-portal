import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyoTranslateService } from 'src/app/services/anyo-translate.service';
import { MemberService } from 'src/app/services/member.service';
import { ISubscriptionCount, ISubscriptionDetails, Status } from 'src/app/stores/types';
import { isDateInRange, isoToDDMMYYYY } from 'src/app/common/utils/utils';
import { ToastService } from 'src/app/common/services/toastr.service';
@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.scss']
})
export class ManageMemberComponent {

  constructor(private translate: AnyoTranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastService,
    private memberService: MemberService) { }

  totalCount: number = 0;
  activeCount: number = 0;
  partnerId!: string;
  subscriptionCount: ISubscriptionCount = { total: 0 };
  subscriptionDetails!: ISubscriptionDetails;

  // fields: any[] = ['', 'Name', 'EmailID', 'Department Name', 'Branch', 'Last Active On'];
  fields: any[] = ['Name', 'EmailID', 'Department Name', 'Branch', 'Last Active On'];
  actionField: Object = {
    label: 'Actions',
    colspan: '3'
  };
  tableData: any[] = [];
  isAlert: boolean = false;
  show: boolean = false;
  memberId!: String;
  alertHeaderDisable: string = "Member Delete"
  alertBodyDisable: string = "Please make sure that you want to delete the member"
  alertHeaderEnable: string = "Member Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the member"

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  disableMember() {
    let req = {
      'status': Status.Inactive
    };
    this.memberService.updateMember(this.memberId, req).subscribe({
      next: (value) => {
        console.log(value);
        this.isAlert = false;
        var flag = true;
        this.show = true;
        this.tableData.every((data, index) => {
          if (data.id == this.memberId) {
            flag = false;
            this.tableData.splice(index, 1);
          }
          return flag;
        })
        setTimeout(() => {
          const element = document.querySelector('.gradual-fade');
          element!.classList.add('hide');
        }, 2000);
        console.log(this.tableData);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.show = false;
  }

  call(id: String) {
    this.isAlert = true;
    this.memberId = id;
  }

  check() {
    if(this.subscriptionCount.total == 0) {
      this.toastrService.showError("Please provide subscription details to add members");
    }
    else {
      if(isDateInRange(String(this.subscriptionDetails.startDate), String(this.subscriptionDetails.endDate) ) == false) {
        this.toastrService.showError("You must have an active subscription to add members");
      }
      else {
        this.router.navigate(['/partner/addmember/'+this.partnerId]);
      }
    }
  }

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
        this.subscriptionCount = value?.subscriptionCount;
        this.subscriptionDetails = value?.subscriptionDetails;
        console.log(value);
        value?.members?.forEach((d: { id: any; partnerId: any; name: any; email: any; department: any; branch: any; status: string; }) => {
          var memberData: any = {};
          var _id = d.id;
          var name = d.name;
          var email = d.email;
          var dept = d.department;
          var branch = d.branch;
          var lastActive = isoToDDMMYYYY(new Date().toISOString());
          var data = [
            // {
            //   data: null,
            //   isImage: true,
            //   imageFile: 'default-user.svg',
            //   isButton: false,
            //   isEditable: false,
            //   isClickable: false,
            //   isCheckbox: false
            // },
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
              route: '/partner/addmember/',
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
            // {
            //   data: null,
            //   isImage: false,
            //   isButton: true,
            //   buttonLabel: 'Resend Invite',
            //   buttonIcon: 'paper-plane.svg',
            //   route: '',
            //   isEditable: false,
            //   isClickable: true,
            //   isCheckbox: false
            // }
          ]
          memberData.id = _id;
          memberData.data = data;
          this.tableData.push(memberData);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params) {
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if (value) {
        this.partnerId = value;
      }
    }
    this.getCount();
    this.listMembers();
  }

}
