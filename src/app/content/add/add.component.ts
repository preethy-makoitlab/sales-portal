import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  @ViewChild('fileInput') fileInput: any;
  modulesArray: any[] = [];

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  submit(form: any) {
    console.log(form.value);
    this.modulesArray = Array(form.value.modules).fill(0).map((x,i)=>i);
  }

}
