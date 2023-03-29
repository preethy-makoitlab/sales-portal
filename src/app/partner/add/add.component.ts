import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  gotonext: boolean = false;
  noOfSpoc: any[] = [0];

  spocObject = {
    'name': '',
    'email': '',
    'mobile': ''
  }

  spoc: any = [
    {
      'name': '',
      'email': '',
      'mobile': ''
    }
  ]

  submit(form: any) {
    console.log(form.value);
  }

  addSpoc() {
    this.noOfSpoc.push(0)
    this.spoc.push(this.spocObject);
  }

  removeSpoc(index: number) {
    this.noOfSpoc.splice(index, 1)
    console.log(this.noOfSpoc);
  }

  next() {
    this.gotonext = true;
  }

  previous() {
    this.gotonext = false;
  }

}
