import { Component } from '@angular/core';
import { AnyoTranslateService } from 'src/app/services/anyo-translate.service';
import { PartnerService } from 'src/app/services/partner.service';
import { isoToDDMMYYYY } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  activeCount: number = 0;
  fields: any[] = ['Partner', 'City', 'State', 'No of Passes', 'No of Therapy Sessions', 'Plan Status', 'Expiry Date'];
  actionField: Object = {
    label: 'Actions',
    colspan: '2'
  };
  tableData: any[] = [];

  constructor(private translate: AnyoTranslateService,
    private partnerService: PartnerService) {
  }

  getCount() {
    this.partnerService.partnerCount().subscribe({
      next: (value) => {
        console.log(value);
        value.forEach((v: { _id: string, count: number; }) => {
          this.totalCount += v.count;
          if(v._id === 'active') {
            this.activeCount += v.count;
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  listPartners() {
    this.partnerService.partnerList().subscribe({
      next: (value) => {
        console.log(value);
        value.forEach((d: { partner: { id: any; companyName: any; partnerId: any; city: any; state: any; status: string; }; subscription: { noOfSubscriptions: string; noOfTherapySessions: string; subscriptionStart: string; subscriptionEnd: string; }; }) => {
          var partnerData: any = {};
          var dataIcon = "";
          var _id = d.partner.id;
          var partnerName = d.partner.companyName;
          var partnerId = d.partner.partnerId;
          var city = d.partner.city;
          var state = d.partner.state
          var noSubscriptions = (d.subscription?.noOfSubscriptions ? "0 / " + d.subscription?.noOfSubscriptions : "");
          var noSessions = (d.subscription?.noOfTherapySessions ? "0 / " + d.subscription?.noOfTherapySessions : "");
          var planStatus;
          if(d.subscription?.subscriptionStart && d.subscription?.subscriptionEnd) {
            planStatus = this.isDateInRange(d.subscription?.subscriptionStart, d.subscription?.subscriptionEnd);
            if(planStatus == "early") {
              dataIcon = "inactive.svg"
            }
            else if(planStatus ==  true) {
              dataIcon = "active.svg"
            }
            else if(planStatus ==  false) {
              dataIcon = "expired.svg"
            }
            else {
              dataIcon = ""
            }
          }
          var startDate = (d.subscription?.subscriptionStart ? isoToDDMMYYYY(d.subscription?.subscriptionStart) : "");
          var endDate = (d.subscription?.subscriptionEnd ? isoToDDMMYYYY(d.subscription?.subscriptionEnd) : "");
          var data = [
            {
              data: [partnerName, partnerId],
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: city,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: state,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: noSubscriptions,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: noSessions,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: [startDate, endDate],
              dataIcon: dataIcon,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: endDate,
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
              route: '/partner/add/',
              isCheckbox: false
            },
            {
              data: null,
              isImage: false,
              isButton: true,
              buttonLabel: 'Manage',
              route: '/partner/managemember/' + partnerId,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            }
          ]
          // var data = [[partnerName, partnerId], city, state, noSubscriptions, noSessions, [startDate, endDate] , endDate];
          partnerData.id = _id;
          partnerData.data = data;
          partnerData.isDisabled = d.partner.status == 'inactive' ? true : false;
          this.tableData.push(partnerData);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isDateInRange(startDateISO: string, endDateISO: string): boolean | string{
    const currentDate = new Date();
    const startDate = new Date(startDateISO);
    const endDate = new Date(endDateISO);
    if(currentDate < startDate) {
      return "early";
    }
    else {
      return currentDate >= startDate && currentDate <= endDate;
    }
  }

  ngOnInit(): void {
    this.getCount();
    this.listPartners();
  }

}
