import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { DashboardCountsComponent } from './dashboard-counts/dashboard-counts.component';
import { FiltersComponent } from './filters/filters.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TableComponent,
    DashboardCountsComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    TableComponent,
    DashboardCountsComponent,
    FiltersComponent
  ],
})
export class SharedModule { }
