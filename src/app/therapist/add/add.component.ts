import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TherapistService } from 'src/app/services/therapist.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  availability: any = [
    {
      day: 'monday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'tuesday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'wednesday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'thursday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'friday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'saturday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'sunday',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'monfri',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    },
    {
      day: 'alldays',
      slot1Start: '',
      slot1End: '',
      ifSlot2: false,
      slot2Start: '',
      slot2End: ''
    }
  ]

  therapist: any = {
    u_id: "01",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    qualification: [""],
    yearsOfExperience: "",
    areaOfExpertise: [""],
    availability: this.availability,
    bio: "",
    isFlexibleWithTiming: false,
    isAvailable: false,
    status: "active",
    preferredModesOfTherapy: [],
    picture: "default",
    availableFrom: "2023-03-24T03:33:11.796Z",
    createdAt: "2023-03-24T03:33:11.796Z",
    createdBy: "admin",
    lastModifiedAt: "2023-03-24T03:33:11.796Z",
    lastModifiedBy: "admin",
    lastSeen: "2023-03-24T03:33:11.796Z",
    rating: 0,
    additionalProp1: {}
  }

  gotonext: boolean = false;
  addTherapistForm!: FormGroup;
  url: string = window.location.href;

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('first') first: any;
  @ViewChild('checkbox') checkbox!: ElementRef<HTMLInputElement>;
  @ViewChild('mode1') mode1!: ElementRef<HTMLInputElement>;
  @ViewChild('mode2') mode2!: ElementRef<HTMLInputElement>;
  @ViewChild('mode3') mode3!: ElementRef<HTMLInputElement>;

  show: boolean = false;
  addSlot: boolean = false;
  audio: any;
  video: any;
  chat: any;

  selectedTag: { category: string; } | undefined;
  items = [];

  itemsAsObjects = [];

  constructor(private formBuilder: FormBuilder,
    private therapistService: TherapistService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.addTherapistForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      experience: ['', Validators.required],
      about: ['', Validators.required]
    });
  }

  setQualifications(qualifications: string[]) {
    console.log(qualifications);
  }

  setAreasOfExpertise(areasOfExpertise: string[]) {
    console.log(areasOfExpertise);
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
    { value: 11, display: 'Item11' },
    { value: 12, display: 'Item12' },
    { value: 13, display: 'Item13' },
    { value: 14, display: 'Item14' }
  ];


  public onInputFocused(event: any) {
    console.log('focused', event, this.itemsAsObjects);
  }

  getPlaceholder(category: string) {
    switch(category) {
      case 'Qualifications': 
        return 'Enter Qualifications';
      case 'Areas of Expertise':
        return 'Select Areas of Expertise';
      default:
        return 'Enter..';
    }
  }
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
    this.therapist.preferredModesOfTherapy = []
    if(form.value.mode1 == true){
      this.therapist.preferredModesOfTherapy.push('audio')
    }
    if(form.value.mode2 == true){
      this.therapist.preferredModesOfTherapy.push('video')
    }
    if(form.value.mode3 == true){
      this.therapist.preferredModesOfTherapy.push('chat')
    }
    if(!form.value.mode1 && !form.value.mode2 && !form.value.mode3) {
      this.therapist.preferredModesOfTherapy.push('')
    }
    console.log(this.therapist)
    console.log(form.value)
    let req = this.therapist;
    this.therapistService.createTherapist(req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/therapist']);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  add(day: string) {
    this.addSlot = true;
    // this.availability[day].ifSlot2 = true;
    // console.log(this.availability)
    var flag = true;
    this.availability.every((item: { [x: string]: string; }, index: string | number) => {
      console.log(item);
      if(item['day'] == day){
        this.availability[index].ifSlot2 = true;
        flag = false
      }
      return flag;
    })
  }

  remove(day: string) {
    this.addSlot = false;
    var flag = true;
    this.availability.every((item: { [x: string]: string; }, index: string | number) => {
      console.log(item);
      if(item['day'] == day){
        this.availability[index].ifSlot2 = false;
        flag = false
      }
      return flag;
    })
    // this.availability[day].ifSlot2 = false;
  }

  reset() {
    this.checkbox.nativeElement.checked = false;
  }

  flexible(event: any) {
    console.log("here")
    this.therapist['isFlexibleWithTiming'] = !this.therapist['isFlexibleWithTiming'];
  }

  available(event: any){
    this.therapist['isAvailable'] = !this.therapist['isAvailable'];
  }

  populate(_id: string) {
    this.therapistService.getTherapist(_id).subscribe({
      next: (value) => {
        console.log(value);
        this.therapist = value;
        this.availability = value.availability;
        this.audio = value.preferredModesOfTherapy.includes('audio') ? true : false;
        this.video = value.preferredModesOfTherapy.includes('video') ? true : false;
        this.chat = value.preferredModesOfTherapy.includes('chat') ? true : false;
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
       this.populate(value)
      }
    }
  }

}
