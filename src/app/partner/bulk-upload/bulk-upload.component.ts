import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {

  @ViewChild('fileInput') fileInput: any;
  isUploaded: boolean = false;
  isValidate: boolean = false;
  excelIcon: string = "";

  openFileExplorer(event: any) {
    this.fileInput.nativeElement.click();
    const file: File = event.target?.files[0];
    if(file){
      const fileArray: any[] = [];
      fileArray.push('file', file, file.name, file.size);
      console.log(fileArray);
      this.isUploaded = true;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.excelIcon = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    else{
      this.isUploaded = false;
    }
  }

  validate() {
    this.isValidate = true;
  }

}
