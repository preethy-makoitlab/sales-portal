import { Component } from '@angular/core';
import { AnyoTranslateService } from '../../services/anyo-translate.service';
import { TherapistService } from 'src/app/services/therapist.service';
import { isoToDDMMYYHHMM } from 'src/app/common/utils/utils';
import { Status } from 'src/app/stores/types';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  constructor(private translate: AnyoTranslateService,
    private therapistService: TherapistService) {
  }
  
  totalCount: number = 0;
  activeCount: number = 0;
  fields: any[] = ['', 'Therapist', 'EmailID', 'Last Active On', 'No of Sessions', 'No of Patients', 'Rating']
  tableData: any[] = [];

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
        console.log(err);
      }
    })
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
          var data = [name, email, lastSeen, sessions, patients, rating]
          therapistData.id = _id;
          therapistData.data = data;
          therapistData.isAvailable = d.isAvailable;
          therapistData.isDisabled = d.status === Status.inactive ? true : false;
          this.tableData.push(therapistData)
          console.log(this.tableData);
          })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getCount();
    this.listTherapist();
  }

}
