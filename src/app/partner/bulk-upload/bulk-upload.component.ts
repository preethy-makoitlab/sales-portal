import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

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
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService) {}
  
  openFileExplorer(event: any) {
    this.fileInput.nativeElement.click();
    const file: File = event.target?.files[0];
    if(file && file.size < this.maxSize){
      // const fileArray: any[] = [];
      const formData = new FormData();
      formData.append('file', file);
      // fileArray.push('file', file, file.name, file.size);
      // console.log(formData);
      this.isUploaded = true;
      this.isLarge = false;
      this.bulkUpload(formData);
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

  bulkUpload(file: any) {
    this.memberService.bulkUpload(this.partnerId, file).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    })
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
