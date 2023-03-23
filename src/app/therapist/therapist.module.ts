import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TherapistRoutingModule } from './therapist-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../common/shared.module';
import { AddComponent } from './add/add.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    ManageComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    TherapistRoutingModule,
    SharedModule,
    FormsModule,
    TagInputModule
  ]
})
export class TherapistModule { }
