import { Component } from '@angular/core';
import { TherapistService } from 'src/app/services/therapist.service';
import { isoToDDMMYYHHMM } from 'src/app/common/utils/utils';
import { Status } from 'src/app/stores/types';
import { ToastService } from 'src/app/common/services/toastr.service';
import { AnyoTranslateService } from 'src/app/common/services/anyo-translate.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
  constructor(private translate: AnyoTranslateService,
    private therapistService: TherapistService,
    private toastrService: ToastService) {
  }

  isAlert: boolean = false;
  totalCount: number = 0;
  activeCount: number = 0;
  fields: any[] = ['Therapist', 'EmailID', 'Last Active On', 'No of Sessions', 'No of Patients', 'Rating'];
  actionField: Object = {
    label: 'Actions',
    colspan: '2'
  };
  tableData: any[] = [];
  alertHeaderAvailability: string = "Therapist Availability";
  alertBodyAvailability: string = "Please make sure that you want to toggle the availability of the therapist";

  getCount() {
    this.therapistService.therapistCount().subscribe({
      next: (value) => {
        value.forEach((v: { _id: string, count: number; }) => {
          this.totalCount += v.count;
          if(v._id === 'active') {
            this.activeCount += v.count;
          }
        })
      },
      error: (err) => {
        this.toastrService.showError("Internal server error! Please try again later");
      }
    })
  }

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  listTherapist() {
    this.therapistService.therapistList().subscribe({
      next: (value) => {
        console.log(value);
        value.forEach((d: { id: string; firstName: string; lastName: string; email: any; lastSeen: any; rating: any; isAvailable: boolean; status: Status}) => {
          var therapistData: any = {};
          var _id = d.id;
          var name = d.firstName + " " + d.lastName;
          var email = d.email;
          var lastSeen = isoToDDMMYYHHMM(d.lastSeen);
          var sessions = 0;
          var patients = 0;
          var rating = d.rating;
          var data = [
            {
              data: name,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: email,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: lastSeen,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: sessions,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: patients,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: rating,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: false
            },
            {
              data: null,
              isImage: true,
              imageFile: 'view-eye.svg',
              isButton: false,
              isEditable: false,
              isClickable: true,
              route: '/therapist/add/',
              isCheckbox: false
            },
            {
              data: null,
              isImage: false,
              isButton: false,
              isEditable: false,
              isClickable: false,
              isCheckbox: true,
              tooltip: "Therapist Availability"
            }
          ]
          therapistData.id = _id;
          therapistData.data = data;
          therapistData.isAvailable = d.isAvailable;
          therapistData.isDisabled = d.status === Status.Inactive ? true : false;
          this.tableData.push(therapistData)
          })
        console.log(this.tableData);
      },
      error: (err) => {
        this.toastrService.showError("Internal server error! Please try again later");
      }
    })
  }

  mark(data: any){
    console.log(data);
    var id = data.id;
    var req = {
      isAvailable: data.isAvailable
    }
    this.therapistService.updateTherapist(id, req).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        this.toastrService.showError("Error updating availability of therapist");
      }
    })
  }

  ngOnInit(): void {
    this.getCount();
    this.listTherapist();
  }
}
