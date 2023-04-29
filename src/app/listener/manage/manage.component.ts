import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isoToDDMMYYYY, isoToTime } from 'src/app/common/utils/utils';
import { ListenerService } from 'src/app/services/listener.service';
import { IListenerCount } from 'src/app/stores/types';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  activeCount: number = 0;
  listenerCount: IListenerCount = { totalChats: 0, totalMins: 0, totalUsers: 0, totalListeners: this.totalCount };
  tableData: any[] = [];
  isAlert: boolean = false;
  pageNo: number = 0;
  pageSize: number = 10;
  contentLength!: number;
  fields: any[] = ['Listeners', 'Phone Number', 'Email ID', 'Last Active On', {label: 'Total Chats (Min)', icon: "table-sort.svg"}, {label: 'No of Min Chats', icon: "table-sort.svg"}, 'Rating']
  actionField: Object = {
    label: 'Actions',
    colspan: '1'
  };

  constructor(private router: Router,
    private listenerService: ListenerService) {}

  call(id: String) {
    this.isAlert = true;
  }

  onScroll() {
    console.log("scrolled");
    if(this.contentLength < this.totalCount) {
      this.pageNo += 1;
      this.list();
    }
  }

  list() {
    this.listenerService.listenerList(this.pageNo, this.pageSize).subscribe({
      next: (value) => {
        console.log(value);
        value.count.forEach((v: { _id: string, count: number; }) => {
          this.totalCount += v.count;
          if(v._id === 'active') {
            this.activeCount += v.count;
          }
        })
        this.listenerCount.totalListeners = this.totalCount;
        this.contentLength = value.data.length;
        value.data.forEach((d: { id: any; name: any; mobileNumber: any; email: any; status: string; }) => {
          var listenerData: any = {};
          var _id = d.id;
          var listenerName = d.name;
          var mobile = d.mobileNumber;
          var email = d.email;
          var lastActiveTime = isoToTime(new Date().toISOString());
          var lastActive = isoToDDMMYYYY(new Date().toISOString());
          var totalChats = 345;
          var minChats = 345;
          var rating = 4.5;
          var data = [
            {
              data: listenerName,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: mobile,
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
              data: [lastActiveTime, lastActive],
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: totalChats,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: minChats,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: rating,
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
              route: '/listener/add/',
              isCheckbox: false
            }
          ]
          // var data = [[partnerName, partnerId], city, state, noSubscriptions, noSessions, [startDate, endDate] , endDate];
          listenerData.id = _id;
          listenerData.data = data;
          listenerData.isDisabled = d.status == 'inactive' ? true : false;
          this.tableData.push(listenerData);
        })
        console.log(this.tableData, this.totalCount);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.list();
  }

}
