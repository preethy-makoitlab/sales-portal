import { Component } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  fields: any[] = ['', 'Therapist', 'EmailID', 'Last Active On', 'No of Sessions', 'No of Patients', 'Rating']
}
