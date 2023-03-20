import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  fields: any[] = ['', 'Therapist', 'EmailID', 'Last Active On', 'No of Sessions', 'No of Patients', 'Rating']
}
