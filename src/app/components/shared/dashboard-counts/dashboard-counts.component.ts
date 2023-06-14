import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard-counts',
  templateUrl: './dashboard-counts.component.html',
  styleUrls: ['./dashboard-counts.component.scss']
})
export class DashboardCountsComponent {
  @Input() sections!: any[];
  subscriptions: Subscription[] = [];
  sectionsMapped : any [] = []
  constructor(private sharedService: SharedService){}

  ngOnInit() {
    for(let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i]
      if(section.subscription) {
        this.subscriptions.push(this.sharedService.getData<string>(section.field).subscribe((data) => {
          this.sections[i].value = data
        }));
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
