import { Component, ViewChild } from '@angular/core';
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
    modules: []
  }

  @ViewChild('fileInput') fileInput: any;
  modulesArray: any[] = [];
  categoryArray: any[] = [];
  modulesNo!: number;
  placeholder: string = "Enter Practice Name";
  icon: string = "../../../assets/icons/success-tick.svg";
  isOriginal!: boolean;
  clicked: boolean = false;
  addContentForm!: FormGroup;

  constructor(private router: Router,
    private contentService: ContentService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) {
      this.addContentForm = this.formBuilder.group({
        category: ['', Validators.required],
        genre: ['', Validators.required],
      });
    }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  submit(form: any) {
    console.log(form.value);
    console.log(this.content);
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
    if(this.content.modules.length > this.modulesNo){
      for(let i= this.content.modules.length; i > this.modulesNo; i--){
        this.content.modules.pop();
      }
    }
    else{
      for(let i= this.content.modules.length; i < this.modulesNo; i++){
        let module = {
          moduleId: i+1,
          moduleName: "",
          file: "",
          thumbnail: ""
        }
        this.content.modules.push(module);
      }
    }
    console.log(this.content.modules);
  }

  fetch() {
    var flag = true;
    this.categoryArray.every(cat => {
      if(cat.category == this.content.category) {
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
