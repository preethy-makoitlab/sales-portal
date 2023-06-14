import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ViewComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
