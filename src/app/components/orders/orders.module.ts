import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from '../shared/table/table.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    OrdersRoutingModule,
  ]
})
export class OrdersModule { }
