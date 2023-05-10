import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common/services/toastr.service';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { RoutineService } from 'src/app/services/routine.service';
import { Status } from 'src/app/stores/types';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  totalCount: number = 0;
  activeCount: number = 0;
  routineData: any[] = [];
  groups: any[] = [];
  routineLength!: number;
  pageNo: number = 0;
  pageSize: number = 12;
  group: string = "";
  routineName: string = "";
  isAlert: boolean = false;
  isDisabled: boolean = false;
  alertHeaderDisable: string = "Routine Delete"
  alertBodyDisable: string = "Please make sure that you want to delete the routine"

  constructor(private router: Router,
    private routineService: RoutineService,
    private masterdataService: MasterdataService,
    private toastrService: ToastService) {}

  dialogShow() {
    this.isAlert = !this.isAlert;
  }

  availability(id: string, isAvailable: boolean, index: number) {
    let req = {
      isAvailable: !isAvailable
    }
    this.routineData[index].isAvailable = !isAvailable;
    this.routineService.updateRoutine(id, req).subscribe({
      next: (value) => {
        console.log(value);
        if(isAvailable){
          this.toastrService.showSuccess("Marked as unavailable");
        }
        else {
          this.toastrService.showSuccess("Marked as available");
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onScroll() {
    console.log("scrolled");
    if(this.routineLength < this.totalCount) {
      this.pageNo += 1;
      this.routineService.routineList(null, this.pageNo, this.pageSize).subscribe({
        next: (value) => {
          console.log(value);
          value.data.forEach((content: any) => {
            this.routineData.push(content);
          })
          this.routineLength = this.routineData.length;
          console.log(this.routineData, this.routineLength);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  filter() {
    console.log(this.group, this.routineName);
    let filter = {
      group: this.group || null,
      routineName: this.routineName || null
    }
    this.routineService.routineList(filter, this.pageNo, this.pageSize).subscribe({
      next: (value) => {
        console.log(value);
        this.totalCount = value.count;
        this.routineData = value.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clear() {
    this.routineService.routineList(null, this.pageNo, this.pageSize).subscribe({
      next: (value) => {
        console.log(value);
        this.totalCount = value.count;
        this.routineData = value.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  disableRoutine(id: string, index: number) {
    let req = {
      status: Status.Inactive
    }
    this.routineService.updateRoutine(id, req).subscribe({
      next: (value) => {
        console.log(value);
        this.toastrService.showSuccess("Routine deleted");
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.isAlert = false;
    this.isDisabled = true;
    this.routineData.splice(index, 1);
    this.totalCount = this.totalCount - 1;
    this.routineLength = this.routineData.length;
  }

  listRoutine() {
    this.routineService.routineList(null, this.pageNo, this.pageSize).subscribe({
      next: (value) => {
        console.log(value);
        this.totalCount = value.count;
        this.routineLength = value.data.length;
        this.routineData = value.data;
        console.log(this.routineData, this.routineLength);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadMaster() {
    let req = {
      categories: ["RoutineGroups"]
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
              this.groups.push(obj)
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
    this.listRoutine();
    this.loadMaster();
  }

}
