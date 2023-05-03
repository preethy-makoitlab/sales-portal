import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { ToastService } from 'src/app/common/services/toastr.service';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  viewForm: boolean = false;
  isDisabled: boolean = false;
  editMode: boolean = false;
  showDisable: boolean = false; 
  isAlert: boolean = false;
  isOriginal!: boolean;
  clicked: boolean = false;
  maxSize: number = 1 * 1024 * 1024 * 1024;
  isLarge: boolean = false;
  isUploaded: boolean = false;
  addRoutineForm!: FormGroup;
  isReUpload: boolean = false;
  totalDelete: boolean = false;
  isSubmit: boolean = false;
  banner: any;
  default: string = ""; /////ngmodel
  formData = new FormData();
  instructors: Select2Data = [{label: "hey", value: "1"}, {label: "hi", value: "2"}, {label: "hello", value: "3"}];
  icon: string = "../../../assets/icons/success-tick.svg";
  placeholder: string = "Enter Routine Name";
  alertHeaderDisable: string = "Routine Deletion";
  alertBodyDisable: string = "Please make sure that you want to delete the routine permananently"
  @ViewChild('fileInput') fileInput: any;
  compulsoryFields = ['group','routineName','timing','banner','difficulty','about','days'];

  days: any = [
    {
      uid: uuidv4(),
      dayNumber: 1,
      genre: "",
      category: "",
      practiceName: "",
      estimatedTime: "7 minutes",
      difficulty: "",
      instructor: [],
      intro: "",
      uploadRequired: ""
    }
  ]

  routine: any = {
    group: "",
    routineName: "",
    timing: "",
    banner: "",
    difficulty: "",
    instructor: [],
    about: "",
    days: this.days
  }

  constructor(private router: Router,
    private masterdataService: MasterdataService,
    private toastrService: ToastService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {}

  dialogShow(type: string) {
    this.isAlert = !this.isAlert;
    if (type === "fulldelete") {
      console.log("fulldelete")
      this.totalDelete = true;
      this.isReUpload = false;
    }
    else {
      this.totalDelete = false;
      this.isReUpload = false;
    }
  }

  onKey(name: any) {
    this.clicked = true;
    console.log(name);
    this.routine.routineName = name;
    // this.contentService.practiceNameCheck(name).subscribe({
    //   next: (value) => {
    //     console.log(value);
    //     if (value.isValid) {
    //       this.isOriginal = true;
    //       this.content.id = value.id;
    //       this.content.practiceName = name;
    //       // this.content = Object.assign(value ,this.content);
    //       console.log("Final", this.content);
    //       this.addModule();
    //     }
    //     else {
    //       this.isOriginal = false;
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  editForm() {
    this.viewForm = false;
    this.editMode = true;
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  uploadFile(event: any) {
    this.banner = event.target?.files[0];
    this.routine.banner = this.banner;
    this.formData = new FormData();
    if (this.banner && this.banner.size < this.maxSize) {
      this.formData.append('file', this.banner);
      console.log(this.banner);
      this.isUploaded = true;
      this.isLarge = false;
      // this.callUploadApi(this.formData, this.content.id, undefined, null, true);
    }
    else if (this.banner && this.banner.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else {
      this.isUploaded = false;
    }
  }

  deleteRoutine() {
    this.isAlert = false;
    this.isDisabled = true;
  }

  updateInstructor(event: Select2UpdateEvent<any>, index: number) {
    this.days[index].instructor = event.value;
  }

  removeDay(id: string) {
    this.days.forEach((day: { uid: string; }, index: any) => {
      if(day.uid == id) {
        this.days.splice(index, 1)
      }
    })
    console.log(this.days);
  }

  addDay() {
    var i = this.days.length;
    var dayObject = {
      uid: uuidv4(),
      dayNumber: i+1,
      genre: "",
      category: "",
      practiceName: "",
      estimatedTime: "7 minutes",
      difficulty: "",
      instructor: [],
      intro: "",
      uploadRequired: ""
    }
    this.days.push(dayObject);
    console.log(this.days);
  }

  submit(form: any) {
    console.log(form.value);
    console.log(this.routine);
    var flag = true;
    this.isSubmit = false;
    this.compulsoryFields.forEach((field: any) => {
      if(!this.routine[field] || this.routine[field].length == 0) {
        flag = false;
      }
      if(field == 'days') {
        this.routine[field].forEach((item: any) => {
          var day: Array<any> = Object.values(item);
          day.forEach(d => {
            if(!d) {
              flag = false;
            }
          })
        })
      }
    })
    if (flag) {
      var num = this.routine.days.length;
      var arr = this.routine.days.map((obj: { dayNumber: any; }) => obj.dayNumber);
      const isAllDaysPresent = Array.from({length: num}, (_, i) => i + 1).every(n => arr.includes(n));
      if(isAllDaysPresent) {
        this.toastrService.showSuccess("Success");
      }
      else {
        this.isSubmit = true;
        this.toastrService.showError("Please provide routine for all days from 1 to desired count");
      }
    }
    else {
      this.isSubmit = true;
      this.toastrService.showError("Please fill all the required fields");
    }
  }

}
