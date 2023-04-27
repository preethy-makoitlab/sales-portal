import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
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
    avtaar: "default",
    dob: Date,
    specialization: [],
    about: ""
  }

  constructor(private router: Router,
    private listenerService: ListenerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private masterdataService: MasterdataService
    ) {
    this.addListenerForm = this.formBuilder.group({   
    });
  }

  submit(form: any) {
    console.log(form.value);
    console.log(this.listener);
    this.listener.dob = new Date(this.listener.dob).toISOString();
    if (this.editMode) {
      let _id = String(this.activatedRoute.snapshot.params['id']);
      this.listenerService.updateListener(_id, this.listener).subscribe({
        next: (value) => {
          console.log(value);
          // this.router.navigate(['/listener']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.listenerService.createListener(this.listener).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/listener']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  updateSpecialization(event: Select2UpdateEvent<any>) {
    this.listener.specialization = event.value;
  }

  updateLanguage(event: Select2UpdateEvent<any>) {
    this.listener.languages = event.value;
  }

  show() {
    this.avtaarCard = !this.avtaarCard;
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
        // this.router.navigate(['/listener']);
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
        // this.router.navigate(['/listener']);
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
        this.listener = value;
        this.listener.dob = isoToYMD(this.listener.dob);
        if (value.status == Status.Inactive) {
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
    }
    this.loadMasterData();

  }

}
