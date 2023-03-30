import { Component } from '@angular/core';
import { AnyoTranslateService } from 'src/app/services/anyo-translate.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  activeCount: number = 0;
  fields: any[] = ['Partner', 'City', 'State', 'No of Passes', 'No of Therapy Sessions', 'Plan Status', 'Expiry Date']
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
        value.forEach((d: { id: any; companyName: any; partnerId: any; city: any; state: any; status: string; }) => {
          var partnerData: any = {};
          var _id = d.id;
          var partnerName = d.companyName;
          var partnerId = d.partnerId;
          var city = d.city;
          var state = d.state
          var data = [[partnerName, partnerId], city, state, '', '', '', ''];
          partnerData.id = _id;
          partnerData.data = data;
          partnerData.isDisabled = d.status == 'inactive' ? true : false;
          this.tableData.push(partnerData);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getCount();
    this.listPartners();
  }

}
