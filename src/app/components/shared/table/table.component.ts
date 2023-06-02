import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
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
  
  constructor(private router: Router, private routerModule: RouterModule) {}

  goto(id: string, route: string) {
    console.log(id);
    if(route){
      this.router.navigate([route]);
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

  showCard(index: number) {
    // const buttons = document.querySelectorAll("#filter");
    index = index - 4;
    const filters = this.filter.toArray();
    const filter = filters[index].nativeElement;
    // var filter = document.getElementById("filter");
    var commonCard = document.getElementById("card");
    if(filter && commonCard) {
      const buttonPosition = filter.getBoundingClientRect();
      commonCard.style.display = "block";
      commonCard.style.top = `${buttonPosition.bottom}px`;
      commonCard.style.left = `${buttonPosition.left}px`;
    }
  }

  closeCard() {
    var commonCard = document.getElementById("card");
    if(commonCard) {
      commonCard.style.display = "none";
    }
  }

  send(){
    var flag = true;
    var obj = {};
    this.data.every(row => {
      if(row.id == this.id){
        var available = !row.isAvailable;
        obj = {
          id: this.id,
          isAvailable: available
        }
        row.isAvailable = available;
        flag = false;
      }
      return flag;
    })
    this.isAlert = false;
    this.open.emit(obj);
  }

  dialogShow(e: any, flag: boolean, id: string) {
    e.preventDefault();
    console.log(this.data, id);
    this.id = id;
    if(flag){
      this.isDisabled = false;
    }
    else{
      this.isDisabled = true;
    }
    this.isAlert = !this.isAlert;
  }

  closeAlert() {
    this.isAlert = false;
  }

  ifObject(item: any) {
    if(typeof item === "object" && item !== null) {
      return true
    }
    else {
      return false
    }
  }

  getDate(date: Date) {
    return dateToddMMYYYY(date);
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  
}
