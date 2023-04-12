import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  content: any = {
    category: "",
    practiceName: "",
    thumbnail:"",
    modules: []
  }

  @ViewChild('fileInput') fileInput: any;
  modulesArray: any[] = [];
  modulesNo!: number;
  placeholder: string = "Enter Practice Name";
  icon: string = "../../../assets/icons/success-tick.svg";

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  submit(form: any) {
    console.log(form.value);
    console.log(this.content);
  }

  onKey(event: any){
    console.log(event);
  }

  addModule(){
    console.log(this.modulesNo);
    for(var i=0; i < this.modulesNo; i++) {
      let module = {
        moduleId: i+1,
        moduleName: "",
        file: "",
        thumbnail: ""
      }
      this.content.modules.push(module);
    }
    console.log(this.content.modules);
  }

}
