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
  formData = new FormData();
  totalRows!: number;
  isInvalid: boolean = false;
  invalidRows: any[] = [];
  invalidCount!: number;
  errorPercent!: number;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService) {}
  
  sendFile(event: any) {
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if(file && file.size < this.maxSize){
      this.formData.append('file', file);
      console.log(file);
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
    this.bulkUpload(this.formData);
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  bulkUpload(file: any) {
    this.memberService.bulkUpload(this.partnerId, file).subscribe({
      next: (value) => {
        console.log(value);
        this.totalRows = value.totalRows;
        if(value.invalidRows.length > 0) {
          this.isInvalid = true;
          this.invalidCount = value.invalidRows.length;
          this.invalidRows = value.invalidRows;
          let set = new Set();
          value.invalidRows.forEach((row: { rowNo: Iterable<unknown> | null | undefined; }) => {
            set.add(row.rowNo);
          })
          let count = set.size;
          this.errorPercent = 100 - ( count / this.totalRows) * 100;
          console.log(this.errorPercent, count, this.totalRows);
        }
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
