import { Component, ElementRef, QueryList, ViewChild, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  module: any = []

  fileDeleteList:string[] = []
  // {
  //   moduleId: "",
  //   moduleName: "",
  //   file: "",
  //   url: "",
  //   type:""
  // }

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

  ];
  // {
  //   isUploaded: false,
  //   isLarge: false
  // }
  categoryArray: any[] = [];
  modulesNo!: number;
  placeholder: string = "Enter Practice Name";
  icon: string = "../../../assets/icons/success-tick.svg";
  isOriginal!: boolean;
  clicked: boolean = false;
  addContentForm!: FormGroup;
  formData = new FormData();
  maxSize: number = 50 * 1024 * 1024;
  isLarge: boolean = false;
  isUploaded: boolean = false;
  viewForm: boolean = false; //
  isDisabled: boolean = false;
  editMode: boolean = false;
  showDisable: boolean = false; //
  isAlert: boolean = false;
  alertHeaderDisable: string = "Content Deletion"
  alertBodyDisable: string = "Please make sure that you want to delete the content permananently"
  alertHeaderEnable: string = "Content Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the content"
  isReUpload: boolean = false;
  totalDelete: boolean = false;

  constructor(private router: Router,
    private contentService: ContentService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
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
   hasDuplicatePropertyValue(objects:any[],property:string) {
    const ids = objects.map(function(object) {
      return object[property];
    });
  
    return (new Set(ids)).size !== ids.length;
  }
  

  dialogShow(type: string) {
    this.isAlert = !this.isAlert;
    if(type === "fulldelete") {
      console.log("fulldelete")
      this.totalDelete = true;
      this.isReUpload = false;
    }
    else if(type === "thumbnail"){
      console.log("thumbnail")
      this.isReUpload = true;
      this.totalDelete = false;
    }
    else{
      console.log("module",type)
      if(this.content.module.length  === 1){
        console.log("YESS");
        window.alert("Atleast one module is needed in content");
        return;
      }
      this.totalDelete = false;
      this.isReUpload = false;
    }
  }

  closeAlert() {
    this.isAlert = !this.isAlert;
    this.isReUpload = false;
    this.totalDelete = false;
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

  deleteFile(url: string) {
    this.contentService.deleteFile(url).subscribe({
      next: (value) => {
        console.log(value);
        // this.router.navigate(['/content']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }
  
  enableContent() {
    this.isAlert = false;
    this.isDisabled = false;
  }

  deleteContent() {
    let _id = String(this.activatedRoute.snapshot.params['id']);
    console.log("YESS",_id);
    this.contentService.deleteContent(_id).subscribe({
      next: (value) => {
        console.log(value);
        this.contentService.deleteContentFiles(_id);
        this.router.navigate(['/content']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }
   sortObjectsByProperty(objects:any, property:string) {
    return objects.sort((a:any, b:any) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  submit(form: any) {
    console.log(form.value);
    if(this.content.module){
      if(this.hasDuplicatePropertyValue(this.content.module,"moduleId")){
 window.alert("Please check Module Index field should be unique");
 return;
      }

    }
    this.content.category = this.selectedCategory.id;
    delete this.content.genre;
    delete this.content.emotion;
    delete this.content.energy;
    if(this.editMode){
      this.module.forEach((mod: any) => {
        this.content.module.push(mod);
      })
    }
    this.content.module.forEach((ctl:any) =>{
      if(ctl.file){
        delete ctl.file;
      }
    })
    if(this.content.module){
      this.content.module = this.sortObjectsByProperty(this.content.module, "moduleId");

    }
    if(this.editMode) {
      let _id = String(this.activatedRoute.snapshot.params['id']);
      this.contentService.updateContent(_id, this.content).subscribe({
        next: (value) => {
          for(let item of this.fileDeleteList){
            this.deleteFile(item);
          }
          this.router.navigate(['/content']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else{
      this.contentService.createContent(this.content).subscribe({
        next: (value) => {
          console.log(value);
          for(let item of this.fileDeleteList){
            this.deleteFile(item);
          }
          this.router.navigate(['/content']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  reUpload() {
    this.isReUpload = true;
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
          this.addModule();
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

  addModule() {
    if(this.editMode){
      this.statusArray = [];
    }
    this.statusArray.push(
      {
        isUploaded: false,
        isLarge: false
      }
    );
    let module = {
               uid: uuidv4(),
               moduleId: "",
              moduleName: "",
              file: "",
              url: "",
              type:""
    }
    this.module.push(module);
    console.log(this.content.module, this.module, this.statusArray);
  }

  removeModule(index: number, url: string, type: string) {
    if(type === "module") {
      console.log(this.statusArray)
      if(this.editMode){
        this.content.module = this.content.module.splice(index, 1);

      }else{
     this.module = this.module.splice(index, 1);
    }
      this.statusArray.splice(index, 1);
      console.log(this.statusArray)
      if(this.statusArray[index].isUploaded) {
        // console.log(url);
        this.fileDeleteList.push(url);
        // this.deleteFile(url);
        this.isAlert =!this.isAlert;
      }
    }
    else if(type === "thumbnail") {
      console.log("thumbnail");
      this.deleteFile(url);
      this.fileDeleteList.push(url);
      // this.deleteFile(url);
      this.content.thumbnail = "";
    }
    else {
      console.log("content")
      this.content.module.splice(index, 1);
      this.fileDeleteList.push(url);
      // this.deleteFile(url);
    }
    console.log(this.content.module, this.module, this.statusArray);
  }

   getFileType(mimeType: string): string | null {
    switch (mimeType) {
      case 'application/pdf':
        return 'pdf';
      case 'image/jpeg':
      case 'image/jpg':
        return 'image';
      case 'image/png':
        return 'image';
      case 'image/gif':
        return 'image';
      case 'text/plain':
        return 'txt';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'doc';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'xls';
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return 'ppt';
      case 'audio/mpeg':
        return 'audio';
      case 'audio/wav':
        return 'audio';
      case 'video/mp4':
          return 'video';
      case 'video/quicktime':
          return 'video';
      default:
        return null;
    }
  }
  
  
  uploadFile(event: any) {
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    if (file && file.size < this.maxSize) {
      this.formData.append('file', file);
      console.log(file);
      this.isUploaded = true;
      this.isLarge = false;
      this.callUploadApi(this.formData,this.content.id,undefined,null,true);
    }
    else if (file && file.size > this.maxSize) {
      this.isLarge = true;
      this.isUploaded = true;
    }
    else {
      this.isUploaded = false;
    }
  }

  uploadModule(event: any,id:string, moduleIndex: any, index: any,uid?:string) {

    moduleIndex = Number(moduleIndex);
    this.formData = new FormData();
    const file: File = event.target?.files[0];
    let module = this.module[index];
    if(this.editMode){
       module = this.content.module[index];
    }
    if(module){
      module.type = file.type;
      this.module[index] = module;

    }
    if (file && file.size < this.maxSize) {
      this.formData.append('file', file);
      console.log(file);
      this.statusArray[index] = {
        isUploaded: true,
        isLarge: false
      };
      console.log(id, index);
      this.callUploadApi(this.formData,id,index,uid);
    }
    else if (file && file.size > this.maxSize) {
      this.statusArray[index] = {
        isUploaded: true,
        isLarge: true
      };
    }
    else {
      this.statusArray[index] = {
        isUploaded: false,
        isLarge: false
      };
    }
  }

  callUploadApi(file: any,id:string,moduleIndex?:string,uid?:any,thumbnail:boolean=false) {
    // let formData = new FormData();
    // let fileToserver: File = file.target?.files[0];
    // formData.append('file',fileToserver);
    console.log(id,moduleIndex,thumbnail,uid);
    this.contentService.uploadFile(id,"content",uid ,file).subscribe({
      next: (value) => {
        console.log(value,moduleIndex,this.content.module);
        if(uid){
          console.log(this.module,this.content.module);
          if(this.editMode) {
            this.module.forEach((mod:any) => {
              console.log(mod.uid,moduleIndex);
              if(mod.uid === uid){
                console.log("YES EDIT");
                 mod.url = value.url;
              }
            });
            // this.module[moduleIndex].url = value.url;
          }
          else{
            this.content.module.forEach((module:any) => {
              if(module.uid === uid){
                console.log("YES");

                 module.url = value.url;
              }
            });
            console.log(this.module,this.content.module);

            // this.content.module[moduleIndex].url = value.url;

          }

        }else{
          if(thumbnail){
          this.content.thumbnail = value.url;
        }
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
      if (cat.category == this.content.category || cat.id == this.content.category) {
        this.selectedCategory = cat;
        this.content.category = cat.category;
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

  loadCategories(id: string, mode: string) {
    this.categoryService.getCategory().subscribe({
      next: (value) => {
        console.log(value);
        this.categoryArray = value;
        if(id){
          this.populate(id, mode);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateModule(event:any,id:any,index:number){
console.log(event);
    if(id){
      console.log(this.isValueInPropertyOfAllObjects(this.module,"moduleId",id));
    if(this.isValueInPropertyOfAllObjects(this.module,"moduleId",id)){
      
      // this.content.module[index].moduleId = this.content.module.length +1;
    }
    }

  }

  isValueInPropertyOfAllObjects(objects:[], property:string, value:any) {
    return objects.every(function(object) {
      return object[property] === value;
    });
  }
  populate(id: string, mode: string) {
    console.log(id);
    this.contentService.getContent(id).subscribe({
      next: (value) => {
        console.log(value);
        this.content = value;
        if(this.content.module){
          this.content.module = this.sortObjectsByProperty(this.content.module,"moduleId");
        }
        this.content.module.forEach((module:any)=>{
          module['uid'] = uuidv4();
        });
        // var flag = true;
        // this.categoryArray.every(cat => {
        //   if(value.category == cat.id) {
        //     flag = false;
        //     this.content.category = cat.category;
        //     this.content.genre = cat.genre;
        //     this.content.emotion = cat.emotionPurpose || "";
        //     this.content.energy = cat.energyPurpose || "";
        //   }
        //   return flag;
        // })
        this.fetch();
        console.log(this.content.module);
        this.content.module.forEach(() => {
          this.statusArray = [];
          this.statusArray.push(
            {
              isUploaded: true,
              isLarge: false
            }
          )
        })
        for(let i of this.content.module){
          this.statusArray.push(
            {
              isUploaded: true,
              isLarge: false
            }
          )
        }
        console.log(this.statusArray);

        this.module = [];
        console.log(this.content, this.module);
        this.isOriginal = true;
        if(mode == "view"){
          this.viewForm = true;
          this.showDisable = true;
        }
        else{
          this.viewForm = false;
          this.showDisable = true;
          this.editMode = true;
        }        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.loadCategories('', '');
    const input = document.getElementById('category');
    input?.addEventListener('click', function () {
      this.focus();
    });
    if (this.activatedRoute.snapshot.params) {
      console.log(this.activatedRoute.snapshot.params);
      var pathname = window.location.pathname.split('/');
      let value = this.activatedRoute.snapshot.params['id'];
      // console.log(this.categoryArray);
      if (value) {
        this.loadCategories(value, pathname[2]);
        // this.populate(value, pathname[2]);
      }
      else{
        this.loadCategories('', '');
      }
    }
  }

}
