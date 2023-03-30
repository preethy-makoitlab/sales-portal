import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';
import { DatepickerModule } from 'ng2-datepicker';


@NgModule({
  declarations: [
    AddComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule
  ]
})
export class PartnerModule { }
