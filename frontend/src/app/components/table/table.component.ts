import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() fields!: any[]
  // data = ['icon', 'Sierra Thompson', 'sierra@gmail.com', '11:00 am', '0', '0', '4.6']

  data: any[] = [
    ['icon', 'Sierra Thompson', 'sierra@gmail.com', '11:00 am', '0', '0', '4.6'],
    ['icon', 'Sierra Thompson', 'sierra@gmail.com', '11:00 am', '0', '0', '4.6'],
    ['icon', 'Sierra Thompson', 'sierra@gmail.com', '11:00 am', '0', '0', '4.6'],
    ['icon', 'Sierra Thompson', 'sierra@gmail.com', '11:00 am', '0', '0', '4.6']
  ]
}
