import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { ToastService } from 'src/app/common/services/toastr.service';
import { isoToYMD } from 'src/app/common/utils/utils';
import { ListenerService } from 'src/app/services/listener.service';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { Status } from 'src/app/stores/types';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  specialization: Select2Data = [];
  language: Select2Data = [];
  avatarNames: any[] = [];
  avatarImages: any[] = [];
  viewForm: boolean = false;
  editMode: boolean = false;
  avtaarCard: boolean = false;
  addListenerForm!: FormGroup;
  isAlert: boolean = false;
  isDisabled: boolean = false;
  thumbnail: string = "";
  isSubmit: boolean = false;
  alertHeaderDisable: string = "Listener Disable"
  alertBodyDisable: string = "Please make sure that you want to disable the listener"
  alertHeaderEnable: string = "Listener Enable"
  alertBodyEnable: string = "Please make sure that you want to enable the listener"

  listener: any = {
    title: "",
    email: "",
    name: "",
    mobileNumber: "",
    languages: [],
    avtaarName: "",
    avtaar: "dummy-avtaar",
    dob: Date,
    specialization: [],
    about: ""
  }

  constructor(private router: Router,
    private listenerService: ListenerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterdataService: MasterdataService,
    private toastrService: ToastService
    ) {
    this.addListenerForm = this.formBuilder.group({   
    });
  }

  submit(form: any) {
    this.isSubmit = false;
    console.log(form.value);
    var errorMessage = "";
    console.log(this.listener);
    var flag = true;
    var listener: Array<any> = Object.values(this.listener);
    listener.forEach((field: any) => {
      if(!field || field.length == 0) {
        flag = false;
      }
    })
    var age = this.calculateAge(this.listener.dob);
    if(age < 18) {
      flag = false;
      errorMessage = "Age must be more than 18 years";
    }
    var dob = this.listener.dob;
    if(flag) {
      if (this.editMode) {
        let _id = String(this.activatedRoute.snapshot.params['id']);
        if(this.thumbnail) {
          this.listener.avtaar = this.thumbnail;
        }
        else {
          this.avatarImages.forEach(avatar => {
            if(this.listener.avtaar === avatar.label) {
              this.listener.avtaar = avatar.value;
            }
          })
        }
        this.listener.dob = new Date(this.listener.dob).toISOString();
        console.log(dob, this.listener.dob);
        this.listenerService.updateListener(_id, this.listener).subscribe({
          next: (value) => {
            console.log(value);
            this.router.navigate(['/listener']);
          },
          error: (err) => {
            this.listener.dob = dob;
            this.avatarImages.forEach(avatar => {
              if(this.listener.avtaar === avatar.value) {
                this.listener.avtaar = avatar.label;
              }
            })
            console.log(err);
            this.toastrService.showError(err.error.message);
          }
        })
      }
      else {
        this.listener.dob = new Date(this.listener.dob).toISOString();
        var avatar = this.listener.avtaar;
        this.listener.avtaar = this.thumbnail;
        this.listenerService.createListener(this.listener).subscribe({
          next: (value) => {
            console.log(value);
            this.router.navigate(['/listener']);
          },
          error: (err) => {
            this.listener.dob = dob;
            this.listener.avtaar = avatar;
            console.log(err);
            this.toastrService.showError(err.error.message);
          }
        })
      }
    }
    else {
      this.isSubmit = true;
      if(errorMessage) {
        this.toastrService.showError(errorMessage);
        errorMessage = "";
      }
      else {
        this.toastrService.showError("Please fill all the required fields");
      }
    }  
  }

  calculateAge(selectedDate: string): number {
    const birthDate = new Date(selectedDate);
    const now = new Date();
    const ageInMillis = now.getTime() - birthDate.getTime();
    const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(ageInYears);
    }  

    updateSpecialization(event: Select2UpdateEvent<any>) {
      this.listener.specialization = event.value;
    }
  
    updateLanguage(event: Select2UpdateEvent<any>) {
      this.listener.languages = event.value;
    }
  

    show() {
      this.avtaarCard = !this.avtaarCard;
      var commonCard = document.getElementById("card");
      var choose = document.getElementById("chooseAvatar");  
      if(choose && commonCard) {
        if(this.avtaarCard) {
          const elementPosition = choose.getBoundingClientRect();
          commonCard.style.display = "flex";
          commonCard.style.top = `${elementPosition.bottom}px`;
          commonCard.style.left = `${elementPosition.left}px`;
        }
        else {
          commonCard.style.display = "none";
        }
      }
  }

  uploadAvatar(id: string, label: string) {
    var commonCard = document.getElementById("card");
    if(commonCard)
    commonCard.style.display = "none";
    this.listener.avtaar = label;
    this.thumbnail = id;
  }

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  editForm() {
    this.viewForm = false;
    this.editMode = true;
  }

  disableListener() {
    let req = {
      'status': Status.Inactive
    };
    this.listener.status = Status.Inactive;
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.listenerService.updateListener(_id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/listener']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
  }

  enableListener() {
    let req = {
      'status': Status.Active
    };
    this.listener.status = Status.Active;
    let _id = String(this.activatedRoute.snapshot.params['id']);
    this.listenerService.updateListener(_id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/listener']);
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = false;
  }

  populate(_id: string) {
    this.listenerService.getListener(_id).subscribe({
      next: (value) => {
        console.log(value);
        this.viewForm = true;
        this.listener = value.data;
        this.listener.dob = isoToYMD(this.listener.dob);
        var masterdata: Array<Array<any>> = Object.values(value.masterdata);
        masterdata.forEach((master, index) => {
          master.forEach((data: { status: Status; m_id: any; data: any; isAvailable: any; }) => {
            if(data.status == Status.Active) {
              let obj = {
                value: data.m_id,
                label: data.data
              }
              if(index == 2 || index == 3) {
                if(data.isAvailable){
                  if(index == 2) {
                    this.avatarNames.push(obj)
                  }
                  if(index == 3) {
                    this.avatarImages.push(obj)
                  }
                }
              } 
              else if(index == 0) {
                this.specialization.push(obj)
              }
              else {
                this.language.push(obj)
              }
            }
          })
        })
        this.avatarImages.forEach(avatar => {
          if(this.listener.avtaar === avatar.value) {
            this.listener.avtaar = avatar.label;
          }
        })
        if (value.data.status == Status.Inactive) {
          this.isDisabled = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadMasterData() {
    let req = {
      categories: ["Languages","ListenersSpecialization","AvatarNames","AvatarImages"]
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
              if(index == 2 || index == 3) {
                if(data.isAvailable){
                  if(index == 2) {
                    this.avatarNames.push(obj)
                  }
                  if(index == 3) {
                    this.avatarImages.push(obj)
                  }
                }
              } 
              else if(index == 0) {
                this.specialization.push(obj)
              }
              else {
                this.language.push(obj)
              }
            }
          })
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.params) {
      console.log(this.activatedRoute.snapshot.params);
      let value = this.activatedRoute.snapshot.params['id'];
      if (value) {
        this.populate(value)
      }
      else {
        this.loadMasterData();
      }
    }
  }

}
