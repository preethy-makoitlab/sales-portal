import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { DatepickerModule } from 'ng2-datepicker';
import { AddMemberComponent } from './add-member/add-member.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';


@NgModule({
  declarations: [
    AddComponent,
    ManageComponent,
    AddMemberComponent,
    ManageMemberComponent
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    DatepickerModule
  ]
})
export class PartnerModule { }
