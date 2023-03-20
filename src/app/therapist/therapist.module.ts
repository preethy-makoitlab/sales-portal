import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TherapistRoutingModule } from './therapist-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from 'shared-ui/src/app/components/shared/shared.module';

@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    TherapistRoutingModule,
    SharedModule
  ]
})
export class TherapistModule { }
