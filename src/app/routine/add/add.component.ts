import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { ToastService } from 'src/app/common/services/toastr.service';
import { CategoryService } from 'src/app/services/category.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { RoutineService } from 'src/app/services/routine.service';
import { Status } from 'src/app/stores/types';
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
  errorMessage = "";
  groups: any[] = [];
  difficulty: any[] = [];
  timings: any[] = [];
  contentArray: any[] = [];
  practiceNameArray: any[] = []
  categoryArray: any[] = [];
  genreArray: any[] = [];
  deepCopyCategoryArray: any[] = []
  instructors: Select2Data = [];
  icon: string = "../../../assets/icons/success-tick.svg";
  placeholder: string = "Enter Routine Name";
  alertHeaderDisable: string = "Routine Deletion";
  alertBodyDisable: string = "Please make sure that you want to delete the routine permananently"
  @ViewChild('fileInput') fileInput: any;
  compulsoryFields = ['group','routineName','banner','about','days'];

  days: any = [
    {
      uid: uuidv4(),
      dayNumber: 1,
      contentId: "",
      genre: "",
      category: "",
      practiceName: "",
      estimatedTime: 0,
      difficulty: "",
      instructor: [],
      categoryArray: [],
      contentArray: [],
      practiceNameArray: [],
      intro: "",
      uploadRequired: ""
    }
  ]

  routine: any = {
    id: "",
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
    private routineService: RoutineService,
    private toastrService: ToastService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private instructorService: InstructorService,
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
    this.routineService.routineNameCheck(name).subscribe({
      next: (value) => {
        console.log(value);
        if (value.isValid) {
          this.isOriginal = true;
          this.routine.id = value.id;
          this.routine.routineName = name;
        }
        else {
          this.isOriginal = false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
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
      this.callUploadApi(this.formData, this.routine.id);
    }
    else if (this.banner && this.banner.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else {
      this.isUploaded = false;
    }
  }

  callUploadApi(file: any, id: string) {
    this.routineService.uploadFile(id, "routine", undefined, file).subscribe({
      next: (value) => {
        console.log(value);
        this.routine.banner = value.url;
      },
      error: (err) => {
        console.log(err);
      }
    })
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
      contentId: "",
      genre: "",
      category: "",
      practiceName: "",
      estimatedTime: "7 minutes",
      difficulty: "",
      instructor: [],
      categoryArray: [],
      contentArray: [],
      practiceNameArray: [],
      intro: "",
      uploadRequired: ""
    }
    this.days.push(dayObject);
    console.log(this.days);
  }

  validation() {
    var flag = true;
    this.isSubmit = false;
    var isAllDaysPresent = false;
    this.errorMessage = "";
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
              this.errorMessage = "Please provide details for atleast one day; all fields within the module are mandatory"
            }
          })
        })
      }
    })
    if (flag) {
      var num = this.routine.days.length;
      var arr = this.routine.days.map((obj: { dayNumber: any; }) => obj.dayNumber);
      isAllDaysPresent = Array.from({length: num}, (_, i) => i + 1).every(n => arr.includes(n));
    }
    return [flag, isAllDaysPresent]
  }

  submit(form: any) {
    console.log(form.value);
    console.log(this.routine);
    var status: any[] = this.validation();
    if(status[0] && status[1]) {
      delete this.routine.instructor;
      this.routine.days.forEach((data: { genre: any; category: any; categoryArray: any; practiceNameArray: any; contentArray: any; instructor: any; practiceName: any; estimatedTime: any; }) => {
        delete data.genre;
        delete data.category;
        delete data.categoryArray;
        delete data.practiceNameArray;
        delete data.contentArray;
        delete data.instructor;
        delete data.practiceName;
        delete data.estimatedTime;
      })
      this.routineService.createRoutine(this.routine).subscribe({
        next: (value) => {
          console.log(value);
          this.toastrService.showSuccess("Success");
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      if(!status[0] && !status[1]) {
        this.isSubmit = true;
        if(this.errorMessage) {
          this.toastrService.showError(this.errorMessage)
        }
        else {
          this.toastrService.showError("Please fill all the required fields");
        }
      }
      else {
        this.isSubmit = true;
        this.toastrService.showError("Please provide routine for all days from 1 to desired count");
      }
    }
  }

  fetch(index: number) {
    console.log(this.routine.days[index].genre)
    let categoryArray: any[]= [];
    this.deepCopyCategoryArray.forEach(cat => {
      if (cat.genreId == this.routine.days[index].genre) {
        categoryArray.push(cat);
      }
    })
    this.routine.days[index].categoryArray = categoryArray;
  }

  set(index: number) {
    console.log(this.routine.days[index].practiceName);
    this.routine.days[index].contentId = this.routine.days[index].practiceName;
    this.routine.days[index].contentArray.forEach((data: { id: any; instructor: any; }) => {
      if(data.id == this.routine.days[index].contentId) {
        this.routine.days[index].instructor = data.instructor
      }
    })
  }

  fetchPracticeName(index: number) {
    let filter = {
      "category": this.routine.days[index].category
    }
    console.log(filter);
    this.routineService.fetchPracticeName(filter).subscribe({
      next: (value) => {
        console.log(value);
        value.forEach((data: { id: any; practiceName: any; }) => {
          let obj = {
            value: data.id,
            label: data.practiceName
          }
          this.routine.days[index].practiceNameArray.push(obj);
          this.routine.days[index].contentArray.push(data);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadCategories() {
    this.categoryService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryArray = value;
        this.deepCopyCategoryArray  = JSON.parse(JSON.stringify(value));
        this.categoryArray.forEach(cat => {
          let obj = {
            id: cat.genreId, 
            genre: cat.genre
          }
          var flag = true;
          if(this.genreArray.some(gen => gen.id === obj.id)) {
            flag = false;
          }
          if(flag){
            this.genreArray.push(obj);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadMasterData() {
    let req = {
      categories: ["RoutineGroups","DifficultyLevels","RoutineTiming"]
    }
    this.masterdataService.fetchMasterData(req).subscribe({
      next: (value) => {
        console.log(value);
        var masterdata: Array<Array<any>> = Object.values(value);
        masterdata.forEach((master, index) => {
          master.forEach(data => {
            if(data.status == Status.Active) {
              let obj = {
                value: data.m_id,
                label: data.data
              }
              if(index == 0) {
                this.groups.push(obj)
              } 
              else if(index == 1) {
                this.difficulty.push(obj)
              }
              else {
                this.timings.push(obj)
              }
            }
          })
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.instructorService.instructorList().subscribe({
      next: (value) => {
        console.log(value);
        value.forEach((data: { id: any; name: any; }) => {
          let obj = {
            value: data.id,
            label: data.name
          }
          this.instructors.push(obj);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  ngOnInit(): void {
    this.loadCategories();
    if (this.activatedRoute.snapshot.params) {
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if (value) {
        // this.populate(value)
      }
      else {
        this.loadMasterData();
      }
    }
  }

}
