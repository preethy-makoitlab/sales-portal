import { Component, ElementRef, QueryList, ViewChild, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  module: any = [
    {
      moduleIndex: "",
      moduleName: "",
      file: "",
      thumbnail: ""
    }
  ]

  content: any = {
    id:"",
    category: "",
    genre: "",
    emotion: "",
    energy: "",
    practiceName: "",
    thumbnail: "",
    module: this.module
  }

  @ViewChild('fileInput') fileInput: any;
  @ViewChildren('moduleInput') moduleInputs!: QueryList<ElementRef>;
  selectedCategory: any;
  statusArray: any[] = [
    {
      isUploaded: false,
      isLarge: false
    }
  ];
  categoryArray: any[] = [];
  modulesNo!: number;
  placeholder: string = "Enter Practice Name";
  icon: string = "../../../assets/icons/success-tick.svg";
  isOriginal!: boolean;
  clicked: boolean = false;
  addContentForm!: FormGroup;
  formData = new FormData();
  maxSize: number = 5 * 1024 * 1024;
  isLarge: boolean = false;
  isUploaded: boolean = false;
  viewForm: boolean = false; //
  isDisabled: boolean = false;
  editMode: boolean = false;
  showDisable: boolean = false; //
  isAlert: boolean = false;
  alertHeaderDisable: string = "Content Deletion"
  alertBodyDisable: string = "Please make sure that you want to delete the content"
  alertHeaderEnable: string = "Content Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the content"

  constructor(private router: Router,
    private contentService: ContentService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef) {
    this.addContentForm = this.formBuilder.group({
      category: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  editForm() {
    this.viewForm = false;
    this.editMode = true;
  }

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  open(index: number) {
    this.cdr.detectChanges();
    const fileInput = this.moduleInputs.toArray()[index];
    if (fileInput) {
      console.log(fileInput);
      fileInput.nativeElement.click();
    }
    else {
      console.log("undefined");
    }
    // console.log(this.moduleInputs);
    // this.moduleInputs.forEach(instance => {
    //   console.log(instance);
    // })
  }

  disableContent() {
    this.isAlert = false;
    this.isDisabled = true;
  }

  enableContent() {
    this.isAlert = false;
    this.isDisabled = false;
  }


  submit(form: any) {
    console.log(form.value);
    this.content.category = this.selectedCategory.id;
    delete this.content.genre;
    delete this.content.emotion;
    delete this.content.energy;
    this.content.module.forEach((ctl:any) =>{
      if(ctl.file){
        delete ctl.file;
      }
    })
    console.log(this.content);
    this.contentService.createContent(this.content).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/content']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onKey(name: any) {
    this.clicked = true;
    console.log(name);
    this.contentService.practiceNameCheck(name).subscribe({
      next: (value) => {
        console.log(value);
        if (value.isValid) {
          this.isOriginal = true;
          this.content.id = value.id;
          this.content.practiceName = name;
          // this.content = Object.assign(value ,this.content);
          console.log("Final",this.content);
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

  // addModule() {
  //   console.log(this.modulesNo);
  //   for (let i = 0; i < this.modulesNo; i++) {
  //     this.statusArray.push(
  //       {
  //         isUploaded: false,
  //         isLarge: false
  //       }
  //     );
  //   }
  //   console.log(this.statusArray);
  //   this.cdr.detectChanges();
  //   if (this.content.module.length > this.modulesNo) {
  //     for (let i = this.content.module.length; i > this.modulesNo; i--) {
  //       this.content.module.pop();
  //     }
  //   }
  //   else {
  //     for (let i = this.content.module.length; i < this.modulesNo; i++) {
  //       let module = {
  //         moduleId: i + 1,
  //         moduleName: "",
  //         file: "",
  //         thumbnail: ""
  //       }
  //       this.content.module.push(module);
  //     }
  //   }
  //   console.log(this.content.module);
  // }

  addModule() {
    console.log(this.modulesNo);
    for (let i = 0; i < this.modulesNo; i++) {
      this.statusArray.push(
        {
          isUploaded: false,
          isLarge: false
        }
      );
    }
    console.log(this.statusArray);
    this.cdr.detectChanges();
    if (this.content.module.length > this.modulesNo) {
      for (let i = this.content.module.length; i > this.modulesNo; i--) {
        this.content.module.pop();
      }
    }
    else {
      for (let i = this.content.module.length; i < this.modulesNo; i++) {
        let module = {
          moduleId: i + 1,
          moduleName: "",
          url: ""
        }
        this.content.module.push(module);
      }
    }
    console.log(this.content.module);
  }


  uploadFile(event: any) {
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if (file && file.size < this.maxSize) {
      this.formData.append('file', file);
      console.log(file);
      this.isUploaded = true;
      this.isLarge = false;
      this.callUploadApi(this.formData,this.content.id);
    }
    else if (file && file.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else {
      this.isUploaded = false;
    }
  }

  uploadModule(event: any,id:string, index: any) {

     index = Number(index);
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if (file && file.size < this.maxSize) {
      this.formData.append('file', file);
      console.log(file);
      this.statusArray[index -1] = {
        isUploaded: true,
        isLarge: false
      };
      this.callUploadApi(this.formData,id,index);
    }
    else if (file && file.size > this.maxSize) {
      this.statusArray[index -1] = {
        isUploaded: true,
        isLarge: true
      };
    }
    else {
      this.statusArray[index -1] = {
        isUploaded: false,
        isLarge: false
      };
    }
  }

  callUploadApi(file: any,id:string,index?:string) {
    // let formData = new FormData();
    // let fileToserver: File = file.target?.files[0];
    // formData.append('file',fileToserver);
    this.contentService.uploadFile(id,"content",index ,file).subscribe({
      next: (value) => {
        console.log(value,index,this.content.module);
        if(index){
          this.content.module.forEach((module:any) => {
          if(Number(module.moduleId) === Number(index)){
             module.url = value.url;
          }
        });

        }else{
          this.content.thumbnail = value.url;
        }
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  fetch() {
    var flag = true;
    console.log(this.content);
    this.categoryArray.every(cat => {
      if (cat.category == this.content.category) {
        this.selectedCategory = cat;
        this.content.genre = cat.genre;
        this.content.emotion = cat.emotionPurpose || "";
        this.content.energy = cat.energyPurpose || "";
        flag = false;
        console.log(this.content);
      }
      return flag;
    })
    if (flag) {
      this.content.genre = "";
      this.content.emotion = "";
      this.content.energy = "";
    }
  }

  loadCategories() {
    this.categoryService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryArray = value;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.loadCategories();
    const input = document.getElementById('category');
    input?.addEventListener('click', function () {
      this.focus();
    });

  }

}
