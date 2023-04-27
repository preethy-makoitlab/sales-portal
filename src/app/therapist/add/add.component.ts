import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TherapistService } from 'src/app/services/therapist.service';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { Status } from 'src/app/stores/types';
import { ContentService } from 'src/app/services/content.service';
import { lastValueFrom } from 'rxjs';
import { ToastService } from 'src/app/common/services/toastr.service';


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
    }
  ]

  extra : any[] = [
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

  qualificationString: string[] = [];
  areaOfExpertiseString: string[] = [];

  therapist: any = {
    u_id: "01",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    qualification: [],
    yearsOfExperience: "",
    areaOfExpertise: [],
    availability: this.availability,
    bio: "",
    isFlexibleWithTiming: false,
    isAvailable: false,
    // status: "active",
    preferredModesOfTherapy: [],
    picture: "",
    availableFrom: new Date(),
    lastSeen: new Date().toISOString(),
    rating: 0,
  }
  form1: any[] = [
    {
      label: 'title',
      status: true
    },
    {
      label: 'firstName',
      status: true
    },
    {
      label: 'lastName',
      status: true
    },
    {
      label: 'email',
      status: true
    },
    {
      label: 'contactNo',
      status: true
    },
    {
      label: 'qualification',
      status: true
    },
    {
      label: 'areaOfExpertise',
      status: true
    },
    {
      label: 'yearsOfExperience',
      status: true
    },
    {
      label: 'bio',
      status: true
    },
    {
      label: 'picture',
      status: true
    }
  ] 

  gotonext: boolean = false;
  addTherapistForm!: FormGroup;
  viewForm: boolean = false;
  editMode: boolean = false;
  isAlert: boolean = false;
  isDisabled: boolean = false;
  reUpload: boolean = false;
  isThumbnail: boolean = false;
  alertHeaderDisable: string = "Therapist Disable"
  alertBodyDisable: string = "Please make sure that you want to disable the therapist"
  alertHeaderEnable: string = "Therapist Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the therapist"
  steppertitle1: string = "Profile Information"
  steppertitle2: string = "Availability"
  alertHeaderDeletePicture:string = "Thumbnail Delete";
  alertBodyDeletePicture:string = "Thumbnail Delete";
  alertHeaderDelete = "Delete";
  alertHeaderCancele = "Cancle";

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
profilePicture:any;
  qualifications: Select2Data = []
  expertise: Select2Data = [];

  constructor(private formBuilder: FormBuilder,
    private therapistService: TherapistService,
    private masterdataService: MasterdataService,
    private router: Router,
    private toastrService: ToastService,
    private activatedRoute: ActivatedRoute,private contentService:ContentService) {
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

  updateQualification(event: Select2UpdateEvent<any>) {
    this.therapist.qualification = event.value;
  }

  updateExpertise(event: Select2UpdateEvent<any>) {
    this.therapist.areaOfExpertise = event.value;
  }

  profilePictureUpdate(event:any){
    this.profilePicture = event.target?.files[0];
    console.log(this.profilePicture);
    this.therapist.picture = this.profilePicture;
    this.reUpload = true;
    // if(this.editMode) {
    //   this.reUpload = true;
    // }
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
  
  next(form: any) {
    var flag = true;
    console.log(form, this.therapist);
    this.form1.forEach((field, index) => {
      // let avoidFields = ["qualification", "expertise", "profilepic"];
      if(!this.therapist[field.label]) {
        this.form1[index].status = false;
        // if(!avoidFields.includes(field.label)){
        //   flag = false;
        // }
        flag = false;
      }
      else {
        this.form1[index].status = true;
      }
    })
    if(flag) {
      this.gotonext = true;
    }
    else {
      this.toastrService.showError("Please fill all the required fields");
    }
  }

  previous() {
    this.gotonext = false;
  }

  editForm() {
    this.viewForm = false;
    this.editMode = true;
  }

  async submit(form: any) {
    console.log(form.value);
    this.therapist.preferredModesOfTherapy = []
    if(form.value.mode1 == true || this.audio == true){
      this.therapist.preferredModesOfTherapy.push('audio')
    }
    if(form.value.mode2 == true || this.video == true){
      this.therapist.preferredModesOfTherapy.push('video')
    }
    if(form.value.mode3 == true || this.chat == true){
      this.therapist.preferredModesOfTherapy.push('chat')
    }
    if(!form.value.mode1 && !form.value.mode2 && !form.value.mode3) {
      this.therapist.preferredModesOfTherapy.push('')
    }
    console.log(this.therapist)
    console.log(form.value)

    if(this.extra[1].slot1Start){
      this.availability.forEach((day: { slot1Start: any; slot1End: any; ifSlot2: boolean; slot2Start: any; slot2End: any; }) => {
        day.slot1Start = this.extra[1].slot1Start;
        day.slot1End = this.extra[1].slot1End;
        if(this.extra[1].ifSlot2 == true) {
          day.ifSlot2 = true;
          day.slot2Start = this.extra[1].slot2Start;
          day.slot2End = this.extra[1].slot2End;
        }
      })
    }
    else if(this.extra[0].slot1Start) {
      var flag = true;
      this.availability.every((day: { slot1Start: any; slot1End: any; ifSlot2: boolean; slot2Start: any; slot2End: any; }, index: number) => {
        day.slot1Start = this.extra[0].slot1Start;
        day.slot1End = this.extra[0].slot1End;
        if(this.extra[0].ifSlot2 == true) {
          day.ifSlot2 = true;
          day.slot2Start = this.extra[0].slot2Start;
          day.slot2End = this.extra[0].slot2End;
        }
        if(index > 3) {
          flag = false;
        }
        return flag;
      })
    }

    console.log(this.availability);
    this.therapist.availability = this.availability;
    console.log(this.therapist);
    this.therapist.picture = "default";
    let req = this.therapist;
    if(this.editMode){
      console.log(this.profilePicture);
      let _id = String(this.activatedRoute.snapshot.params['id']);
      if(this.profilePicture){
        console.log("exist");
        let formData  = new FormData();
        formData.append("file",this.profilePicture);
        let uploaded  = this.contentService.uploadFile(_id,"user",undefined,formData);
        let obj = (await lastValueFrom(uploaded));
        req.picture = obj.url;
      }
      this.therapistService.updateTherapist(_id, req).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/therapist']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }  
    else {
      this.therapistService.createTherapist(req).subscribe({
        next: async (value:any) => {
          console.log(value);
          if(this.profilePicture){
            let formData  = new FormData();
            formData.append("file",this.profilePicture);
          let uploaded  = this.contentService.uploadFile(value.response.id,"user",undefined,formData);
          let url = (await lastValueFrom(uploaded))?.url || null;

          if(url){
            value.picture = url;
            let saved  = this.therapistService.updateTherapist(value.response.id, value);
            let res = (await lastValueFrom(saved));
            console.log(res);
          }
        }
          this.router.navigate(['/therapist']);
        },
        error: (err) => {
          console.log(err);
          this.toastrService.showError(err.error.message);
        }
      })
    }

  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  add(day: string) {
    this.addSlot = true;
    if(!this.viewForm){
      var flag = true;
      if(day == 'monfri' || day == 'alldays') {
        this.extra.every((item, index) => {
          console.log(item);
          if(item['day'] == day){
            this.extra[index].ifSlot2 = true;
            flag = false
          }
          return flag;
      })
      }
      else{
        this.availability.every((item: { [x: string]: string; }, index: string | number) => {
          console.log(item);
          if(item['day'] == day){
            this.availability[index].ifSlot2 = true;
            flag = false
          }
          return flag;
      })
      }
    }
  }

  remove(day: string) {
    this.addSlot = false;
    if(!this.viewForm) {
      var flag = true;
      if(day == 'monfri' || day == 'alldays') {
        this.extra.every((item, index) => {
          console.log(item);
          if(item['day'] == day){
            this.extra[index].ifSlot2 = false;
            flag = false
          }
          return flag;
      })
      }
      else{
        this.availability.every((item: { [x: string]: string; }, index: string | number) => {
          console.log(item);
          if(item['day'] == day){
            this.availability[index].ifSlot2 = false;
            flag = false
          }
          return flag;
        })
      }
    }
  }

  reset() {
    console.log(this.availability, this.extra);
    this.availability.forEach((day: { slot1Start: string; slot1End: string; ifSlot2: boolean; slot2Start: string; slot2End: string; }) => {
      day.slot1Start = '';
      day.slot1End = '',
      day.ifSlot2 = false;
      day.slot2Start = '';
      day.slot2End = '';
    })
    this.extra.forEach((day: { slot1Start: string; slot1End: string; ifSlot2: boolean; slot2Start: string; slot2End: string; }) => {
      day.slot1Start = '';
      day.slot1End = '',
      day.ifSlot2 = false;
      day.slot2Start = '';
      day.slot2End = '';
    })
  }

  flexible(event: any) {
    console.log("here")
    this.therapist['isFlexibleWithTiming'] = !this.therapist['isFlexibleWithTiming'];
  }

  available(event: any){
    this.therapist['isAvailable'] = !this.therapist['isAvailable'];
  }

  dialogShow(type: string) {
    if(type === "thumbnail") {
      this.isThumbnail = true;
    }
    else {
      this.isThumbnail = false;
    }
    this.isAlert = !this.isAlert;
  }

  closeAlert() {
    this.isAlert = false;
    this.isThumbnail = false;
  }

  disableTherapist() {
    let req = {
       'status' : Status.Inactive, 
       'isAvailable' : false
    };
    this.therapist.status = Status.Inactive;
    this.therapist.isAvailable = false;   
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.therapistService.updateTherapist(_id, req).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }

  async deletePicture(url:string){
  if(url ){
 let deletereq = this.contentService.deleteFile(url);
 let res = await lastValueFrom(deletereq);
 this.therapist.id
 console.log(res);
 this.profilePicture = null;
 this.therapist.picture = "";
 if(this.therapist.id){
 this.therapistService.updateTherapist(this.therapist.id,{picture:'default'});

}
this.isAlert = false;

}


  }
  onImageError(){
    this.therapist.picture = 'default';
  }
  enableTherapist() {
    let req = {
       'status' : Status.Active, 
       'isAvailable' : true
    };
    this.therapist.status = Status.Active;
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.therapistService.updateTherapist(_id, req).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = false;
  }

  populate(_id: string) {
    this.therapistService.getTherapist(_id).subscribe({
      next: (value) => {
        console.log(value);
        this.viewForm = true;
        this.therapist = value;
        const array = JSON.parse(JSON.stringify(value.availability));
        this.audio = value.preferredModesOfTherapy.includes('audio') ? true : false;
        this.video = value.preferredModesOfTherapy.includes('video') ? true : false;
        this.chat = value.preferredModesOfTherapy.includes('chat') ? true : false;

        var count = 0;
        var flag = true;
        
        var slot1Start = value.availability[0].slot1Start;
        var slot1End = value.availability[0].slot1End;
        if(value.availability[0].ifSlot2 == true) {
          var slot2Start = value.availability[0].slot2Start;
          var slot2End = value.availability[0].slot2End;
        }  

        console.log(slot1Start, slot1End, slot2Start, slot2End);  
        
        value.availability.every((day: { slot1Start: any; slot1End: any; ifSlot2: boolean; slot2Start: any; slot2End: any; }) => {
          console.log(day);
          if(day.slot1Start == slot1Start && day.slot1End == slot1End) {
            if(value.availability[0].ifSlot2 == true){
              if(day.slot2Start == slot2Start && day.slot2End == slot2End){
                count += 1;
              }
              else{
                flag = false;
              }
            }
            else{
              count += 1;
            }
          }
          else{
            flag = false;
          }
          return flag;
        })

        console.log(count);
        if(count == 7) {
          console.log('alldays')
          this.extra[1] = array[0];
          this.extra[1].day = "alldays";
          console.log(this.extra, this.availability, value.availability, array);
        }
        else if(count == 5){
          console.log('monfri')
          this.extra[0] = array[0];
          this.extra[0].day = "monfri";
          console.log(this.extra, this.availability, value.availability, array);
        }
        else{
          this.availability = value.availability;
        }
        
        console.log(this.availability);
        if(value.status == 'inactive') {
          this.isDisabled = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  loadMasterData() {  
    this.masterdataService.masterDataList().subscribe({
      next: (masterdata) => {
        console.log(masterdata);
        masterdata.forEach((master: { category: string; masterData: any[]; }) => {
          if(master.category == 'Qualifications'){
            master.masterData.forEach(data => {
              if(data.status == 'active'){
                let obj = {
                  value: data.data.toString(),
                  label: data.data
                }
                this.qualifications.push(obj);
              }
            })
          }

          if(master.category == 'AreasOfExpertise'){
            master.masterData.forEach(data => {
              if(data.status == 'active'){
                let obj = {
                  value: String(data.data),
                  label: data.data
                }
                this.expertise.push(obj);
              }
            })
          }
        })
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

    this.loadMasterData();
  }

}
