import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/services/shared.service';
import { dateToddMMYYYY } from 'src/app/utils/utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() fields!: any[]
  @Input() data!: any[]
  @Output() open = new EventEmitter<Object>();
  @Output() scroll = new EventEmitter<Event>();
  @Output() call = new EventEmitter<String>();
  @Output() membersArray = new EventEmitter<any>();
  @ViewChildren('filter') filter!: QueryList<ElementRef>;
  @ViewChildren('checkbox') checkbox!: QueryList<ElementRef>;
  flag: boolean = false;
  totalCheck: boolean = false;
  id!: string;
  isAlert: boolean = false;
  isDisabled: boolean = false;
  actionArray: any[] = [];
  alertHeader: string = "Therapist Availability"
  alertBodyDisable: string = "Please make sure that you want to make the therapist unavailable"
  alertBodyEnable: string = "Please make sure that you want to make the therapist available"
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  
  constructor(private router: Router, private routerModule: RouterModule, private sharedService: SharedService) {}

  goto(id: string, route: string) {
    if(route){
      this.router.navigate([route, id]);
    }
    else{
      this.call.emit(id);
    }
    console.log(id);
  }

  selectRow(id?: string) {
    if(id) {
      if(this.actionArray.includes(id)) {
        const index = this.actionArray.indexOf(id);
        this.actionArray.splice(index, 1);
      }
      else {
        this.actionArray.push(id);
      }
    }
    else {
      const checkArray = this.checkbox.toArray();
      this.totalCheck = !this.totalCheck;
      this.actionArray = [];
      if(this.totalCheck) {
        this.data.forEach(row => {
          this.actionArray.push(row.id);
        })
        checkArray.forEach(element => {
          element.nativeElement.checked = true;
        })
      }
      else {
        checkArray.forEach(element => {
          element.nativeElement.checked = false;
        })
      }
    }
    this.membersArray.emit(this.actionArray);
  }

  isArray(data: any) {
    if(Array.isArray(data)){
      return true;
    }
    else{
      return false;
    }
  }

  onScroll(event: any) {
    console.log(event);
    this.scroll.emit(event);
  }

  getDate(date: Date) {
    return dateToddMMYYYY(date);
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
