import { Component } from '@angular/core';
import { IListenerCount } from 'src/app/stores/types';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  listenerCount: IListenerCount = { totalChats: 0, totalMins: 0, totalUsers: 0, totalListeners: 0 };
  tableData: any[] = [];
  isAlert: boolean = false;
  fields: any[] = ['Listeners', 'Phone Number', 'Email ID', 'Last Active On', {label: 'Total Chats (Min)', icon: "table-sort.svg"}, {label: 'No of Min Chats', icon: "table-sort.svg"}, {label: 'Rating', icon: "table-sort.svg"}]
  actionField: Object = {
    label: 'Actions',
    colspan: '2'
  };

  call(id: String) {
    this.isAlert = true;
  }

}
