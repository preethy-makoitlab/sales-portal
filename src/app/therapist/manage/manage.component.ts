import { Component } from '@angular/core';
import { AnyoTranslateService } from '../../services/anyo-translate.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  constructor(private translate: AnyoTranslateService) {
  }
  
  count: number = 10;
  fields: any[] = ['', 'Therapist', 'EmailID', 'Last Active On', 'No of Sessions', 'No of Patients', 'Rating']
}
