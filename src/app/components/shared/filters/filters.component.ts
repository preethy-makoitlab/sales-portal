import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() filters!: any[];
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();

  onSelect(field: string, event: any) {
    const obj : any = {};
    obj[field] = event?.target?.value || '';
    this.selectedValue.emit(obj);
  }

  onKeyup(event: any) {
    const obj : any = {'global': ''};
    obj.global = event?.target?.value || '';
    this.selectedValue.emit(obj);
  }
}
