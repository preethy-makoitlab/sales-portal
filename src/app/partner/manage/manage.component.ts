import { Component } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  activeCount: number = 0;
  fields: any[] = ['', 'Company', 'Company Address', 'City', 'State', 'No of Passes', 'No of Therapy Sessions', 'Plan Status']
  tableData: any[] = [];

}
