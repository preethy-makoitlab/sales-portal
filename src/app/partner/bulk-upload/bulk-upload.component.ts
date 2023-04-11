import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {

  @ViewChild('fileInput') fileInput: any;
  isUploaded: boolean = false;
  isValidate: boolean = false;
  maxSize: number = 5 * 1024 * 1024;
  isLarge: boolean = false;
  partnerId: string = "";

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {}
  
  openFileExplorer(event: any) {
    this.fileInput.nativeElement.click();
    const file: File = event.target?.files[0];
    if(file && file.size < this.maxSize){
      const fileArray: any[] = [];
      fileArray.push('file', file, file.name, file.size);
      console.log(fileArray);
      this.isUploaded = true;
      this.isLarge = false;
    }
    else if(file && file.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else{
      this.isUploaded = false;
    }
  }

  validate() {
    this.isValidate = true;
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params){
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if(value){
       this.partnerId = value;
      }
    }
  }

}
