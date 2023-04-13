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

  content: any = {
    category: "",
    genre: "",
    emotion: "",
    energy: "",
    practiceName: "",
    thumbnail:"",
    module: []
  }

  @ViewChild('fileInput') fileInput: any;
  @ViewChildren('moduleInput') moduleInputs!: QueryList<ElementRef>;
  selectedCategory: any;
  statusArray: any[] = [];
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

  open(index: number) {
    this.cdr.detectChanges();
    const fileInput = this.moduleInputs.toArray()[index];
    if(fileInput) {
      console.log(fileInput);
      fileInput.nativeElement.click();
    }
    else{
      console.log("undefined");
    }
    // console.log(this.moduleInputs);
    // this.moduleInputs.forEach(instance => {
    //   console.log(instance);
    // })
  }

  submit(form: any) {
    console.log(form.value);
    this.content.category = this.selectedCategory.id;
    delete this.content.genre;
    delete this.content.emotion;
    delete this.content.energy;
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

  onKey(name: any){
    this.clicked = true;
    console.log(name);
    this.contentService.practiceNameCheck(name).subscribe({
      next: (value) => {
        console.log(value);
        if(value.isValid) {
          this.isOriginal = true;
          this.content.practiceName = name;
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

  addModule(){
    console.log(this.modulesNo);
    for(let i=0 ; i < this.modulesNo; i++) {
      this.statusArray.push(
        {
          isUploaded: false,
          isLarge: false
        }
      );
    }
    console.log(this.statusArray);
    this.cdr.detectChanges();
    if(this.content.module.length > this.modulesNo){
      for(let i= this.content.module.length; i > this.modulesNo; i--){
        this.content.module.pop();
      }
    }
    else{
      for(let i= this.content.module.length; i < this.modulesNo; i++){
        let module = {
          moduleId: i+1,
          moduleName: "",
          file: "",
          thumbnail: ""
        }
        this.content.module.push(module);
      }
    }
    console.log(this.content.module);
  }

  uploadFile(event: any) {
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if(file && file.size < this.maxSize){
      this.formData.append('image', file);
      console.log(file);
      this.isUploaded = true;
      this.isLarge = false;
      this.callUploadApi(this.formData);
    }
    else if(file && file.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else{
      this.isUploaded = false;
    }
  }

  uploadModule(event: any, index: number) {
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if(file && file.size < this.maxSize){
      this.formData.append('file', file);
      console.log(file);
      this.statusArray[index] = {
        isUploaded: true,
        isLarge: false
      };
      this.callUploadApi(this.formData);
    }
    else if(file && file.size > this.maxSize) {
      this.statusArray[index] = {
        isUploaded: true,
        isLarge: true
      };
    }
    else{
      this.statusArray[index] = {
        isUploaded: false,
        isLarge: false
      };
    }
  }

  callUploadApi(file: any) {
    let formData = new FormData();
    formData.append('file',file);
    this.contentService.uploadFile(formData).subscribe({
      next: (value) => {
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
      if(cat.category == this.content.category) {
        this.selectedCategory = cat;
        this.content.genre = cat.genre;
        this.content.emotion = cat.emotionPurpose || "";
        this.content.energy = cat.energyPurpose || "";
        flag = false;
        console.log(this.content);
      }
      return flag;
    })
    if(flag) {
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
  }

}
