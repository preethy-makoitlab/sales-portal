import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TagModel } from 'ngx-chips/core/tag-model';
import { TagInputComponent } from 'ngx-chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  availability: any = {
    'monday': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'tuesday': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'wednesday': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'thursday': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'friday': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'saturday': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'monfri': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    },
    'alldays': {
      slot1: '',
      ifSlot2: false,
      slot2: ''
    }
  }

  therapist: any = {
    title: '',
    firstName: '',
    lastName: '',
    emailId: '',
    mobile: '',
    qualifications: [],
    experience: '',
    expertise: '',
    profilePic: '',
    about: '',
    availability: this.availability,
    flexibleWithTimings: false,
    therapistAvailable: false,
    modeOfTherapy: []
  }

  gotonext: boolean = false;
  addTherapistForm!: FormGroup;

  @ViewChild('tagInput') tagInputRef: TagInputComponent | undefined;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('first') first: any;
  @ViewChildren('checkbox') checkbox!: ElementRef<HTMLInputElement>;

  show: boolean = false;
  addSlot: boolean = false;

  selectedTag: { category: string; } | undefined;
  items = [];

  itemsAsObjects = [];

  constructor(private formBuilder: FormBuilder) {
    this.addTherapistForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      experience: ['', Validators.required],
      expertise: ['', Validators.required],
      about: ['', Validators.required],
    });
  }

  hello() {
    this.show = !this.show;
  }

  autocompleteItems = [
    { value: 3, display: 'Item3' },
    { value: 4, display: 'Item4' },
    { value: 5, display: 'Item5' },
    { value: 6, display: 'Item6' },
    { value: 7, display: 'Item7' },
    { value: 8, display: 'Item8' },
    { value: 9, display: 'Item9' },
    { value: 10, display: 'Item10' },
    { value:11, display: 'Item11' },
    { value: 12, display: 'Item12' },
    { value: 13, display: 'Item13' },
    { value: 14, display: 'Item14' }
  ];

  autocompleteItemsAsObjects = [
    { id: '1', name: 'Angular', category: 'Framework' },
    { id: '0', name: 'React', category: 'Framework' },
    { id: '2', name: 'TypeScript', category: 'Language' }
  ];

  public onInputFocused(event: any) {
    console.log('focused', event, this.itemsAsObjects);
  }

  public onTagSelected(event: any) {
    console.log('selected', event, this.tagInputRef);
    this.selectedTag = event;
    this.tagInputRef?.dropdown.show();
  }

  public requestAutocompleteItems$ = (text: string): Observable<TagModel[]> => {
    console.log('autocomplete', this.selectedTag);
    if (this.selectedTag) {
      return of(
        this.autocompleteItemsAsObjects.filter(
          item => item.category === this.selectedTag?.category
        )
      );
    }
    return of(this.autocompleteItemsAsObjects);
  };


  // userSelectsString = '';
  // name = 'Angular';
  // userSelects: any[] = [];
  //  suggestions = [{"id":"001","name":"mango"},{"id":"002","name":"apple"},{"id":"003","name":"banana"},{"id":"004","name":"pine"},{"id":"005","name":"orange"},{"id":"006","name":"chery"},{"id":"007","name":"watermelon"},{"id":"008","name":"grapes"},{"id":"009","name":"lemon"}];

  // show: boolean = false;

  // suggest() {
  //   this.show = true;
  // }

  // isSelected(s:any) {
  //  return this.userSelects.findIndex((item: any) => item.id === s.id) > -1 ? true : false;
  // }


  // // selectSuggestion(s) {
  // //   if(this.userSelects.indexOf(s) > -1){
  // //      this.userSelects = this.userSelects.replace(s,'');
  // //   } else {
  // //      this.userSelects += ' '+s;
  // // }
  // //   this.userSelects = this.userSelects.replace(/^\s*/,'');//.trim();
  // //   this.deleteInvalidSelects();
  // //   this.show = false;
  // // }

  // selectSuggestion(s: any) {
  //   this.userSelects.find((item) => item.id === s.id) ? 
  //   this.userSelects = this.userSelects.filter((item) => item.id !== s.id) :
  //   this.userSelects.push(s);
  //   // this.assignToNgModel();
  // }

  // // deleteInvalidSelects() {
  // //  for(var user of this.invalidUsers){
  // //     if(this.userSelects.indexOf(user) > -1){
  // //        this.userSelects = this.userSelects.replace(user, ' ');
  // //     }
  // //   }
  // // }

  // deleteSelects(s: any) {
  //   this.userSelects = this.userSelects.filter((item) => item.id !== s.id);
  //   // this.assignToNgModel();
  // }

  // assignToNgModel() {
  //   this.userSelectsString = '';
  //   this.userSelects.map((item) => this.userSelectsString += item.name + ' ');
  // }

  next() {
    this.gotonext = true;
  }

  previous() {
    this.gotonext = false;
  }

  submit(form: any) {
    console.log(this.therapist)
    console.log(form.value)
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  add(day: string) {
    this.addSlot = true;
    this.availability[day].ifSlot2 = true;
    console.log(this.availability)
  }

  remove(day: string) {
    this.addSlot = false;
    this.availability[day].ifSlot2 = false;
  }

  reset() {
    this.checkbox.nativeElement.checked = false;
  }
}
