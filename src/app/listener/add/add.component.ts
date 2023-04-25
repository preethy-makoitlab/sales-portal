import { Component } from '@angular/core';
import { Select2Data } from 'ng-select2-component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  qualifications: Select2Data = []
  viewForm: boolean = false;
  editMode: boolean = false;

  submit(form: any) {
    console.log(form);
  }

}
