import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-counts',
  templateUrl: './dashboard-counts.component.html',
  styleUrls: ['./dashboard-counts.component.scss']
})
export class DashboardCountsComponent {
  @Input() sections!: any[];
}
