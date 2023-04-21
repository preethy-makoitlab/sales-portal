import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {

  @ViewChild('fileInput') fileInput: any;
  isUploaded: boolean = false;
  isValidated: boolean = false;
  maxSize: number = 5 * 1024 * 1024;
  isLarge: boolean = false;
  partnerId: string = "";
  formData = new FormData();
  totalRows: number = 0;
  isInvalid: boolean = false;
  invalidRows: any[] = [];
  invalidCount: number = 0;
  errorPercent: number = 0;
  validCount: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService) { }

  sendFile(event: any) {
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if (file && file.size < this.maxSize) {
      this.formData.append('file', file);
      console.log(file);
      this.isUploaded = true;
      this.isLarge = false;
    }
    else if (file && file.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else {
      this.isUploaded = false;
    }
    if (this.isUploaded) {
      this.validate()
    }
  }

  validate() {
    // this.isValidated = true;
    this.bulkUpload(this.formData);
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  bulkUpload(file: any) {
    this.memberService.bulkUpload(this.partnerId, file).subscribe({
      next: (value) => {
        console.log(value);
        this.isValidated = true;
        this.totalRows = value.totalRows;
        if (value.invalidRows.length > 0) {
          this.isInvalid = true;
          this.invalidCount = value.invalidRows.length;
          this.invalidRows = value.invalidRows;
          this.validCount = this.totalRows - this.invalidCount;
          let set = new Set();
          value.invalidRows.forEach((row: { rowNo: Iterable<unknown> | null | undefined; }) => {
            set.add(row.rowNo);
          })
          let count = set.size;
          this.errorPercent = 100 - (count / this.totalRows) * 100;
          console.log(this.errorPercent, count, this.totalRows);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  downloadTemplate() {
    // this.httpClient.get("http://34.131.6.95:3005/download/bulk-upload-template",{responseType:'blob'}).subscribe({

    this.memberService.downloadSampleTemplate().subscribe({
      next:(res:any)=>{
        // console.log("res",res);
        // this.downloadFile(res);
        saveAs(res,"template.xlsx")
      },
      error:(err:any)=>{
        console.log("err",err);

        // saveAs(err,"template.xlsx")

      }

    })
    // http://34.131.6.95:3005/download/bulk-upload-template?Authorization=Bearer 6434ec72c6d448af54bed8a1

      //  return res;
    // this.memberService.downloadSampleTemplate();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params) {
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if (value) {
        this.partnerId = value;
      }
    }
  }

}
