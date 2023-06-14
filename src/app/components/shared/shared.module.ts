import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { DashboardCountsComponent } from './dashboard-counts/dashboard-counts.component';
import { FiltersComponent } from './filters/filters.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    TableComponent,
    DashboardCountsComponent,
    FiltersComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    TableComponent,
    DashboardCountsComponent,
    FiltersComponent,
    CardComponent
  ],
})
export class SharedModule { }
